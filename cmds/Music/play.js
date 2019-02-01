const Discord = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YOUTUBE_API);

let servers = {};
module.exports.run = async(bot, message, args,ops) => {
    let reaction_numbers = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"];
    let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    const searchString = args.join(' ');
    const serverQueue = ops.active.get(message.guild.id);
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('Bạn phải vào voice channel đã!');
    
	  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
		const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); 
				await handleVideo(video2, message, voiceChannel, true); 
			}
		return message.channel.send(`✅ Bài hát đã được thêm vào danh sách!`);
	} else {
                try {
                    var video = await youtube.getVideo(url);
                } catch (error) {
                    try {
                        var videos = await youtube.searchVideos(searchString, 5);
                        let index = 0;
                const embed = new Discord.RichEmbed()
                  .setTitle('Chọn bài hát. Bạn hãy chọn các số từ 1-5 để tiếp tục')
                  .setFooter('Bạn có 20 giây để lựa chọn')
              videos.map(video2 => embed.addField(`${reaction_numbers[++index]} ${video2.title}`,'----------------------'))
                
                message.channel.send(embed).then(msg => {
                    msg.delete(21000)
                });;

                   try {
                        var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 20000,
                            errors: ['time']
                    });
                } catch (err) {
                        console.error(err);
                        return message.channel.send('Bạn đã không nhập kết quả, hủy lựa chọn!');
                }
                const videoIndex = parseInt(response.first().content);
				        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send('Không tìm thấy kết quả!');
				}
			}
			return handleVideo(video, message, voiceChannel);
}

async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = ops.active.get(message.guild.id);
    const song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`
	}
    if (!serverQueue) {
		  const queueConstruct = {
			  textChannel: message.channel,
			  voiceChannel: voiceChannel,
			  connection: null,
			  songs: [],
			  volume: 5,
			  playing: true
		};
		ops.active.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			  var connection = await message.member.voiceChannel.join();
			  queueConstruct.connection = connection;
			  play(message.guild, queueConstruct.songs[0]);
		  } catch (error) {
			  console.error(`I could not join the voice channel: ${error}`);
			  ops.active.delete(message.guild.id);
			  return message.channel.send(`Bot không thể vào được voice channel: ${error}`);
		  }
    } else {
		  serverQueue.songs.push(song);
		  console.log(serverQueue.songs);
		  if (playlist) return undefined;
		  else return message.channel.send(`✅ Bài hát đã được thêm vào danh sách!`);
	}
	return undefined;
}
async function play(guild, song){
	const serverQueue = ops.active.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		ops.active.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
      message.channel.send('Bài hát đã kết thúc!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  const mEmbed = new Discord.RichEmbed()
    .setColor('#4286f4')
    .addField(`=========================================================`,`
🎶 Đang phát nhạc: **${song.title}**
:white_circle:─────────────────────────────────────────── 
◄◄⠀▐▐ ⠀►►⠀⠀　　        　　 :gear: ❐ ⊏⊐ 
========================================================= `)
  serverQueue.textChannel.send(mEmbed);
}
}
module.exports.config = {
  command: 'play',
  category: 'Music',
  description: "Dùng để phát nhạc",
  usage: ">>play [tên bài hát hoặc link]"
}


const Discord = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YOUTUBE_API);
const superagent = require('superagent');


module.exports.run = async(bot, message, args,ops) => {
    bot.on('warn', console.warn);
    bot.on('error', console.error);
    bot.on('disconnect', () => console.log('Bot bị lỗi kết nối...'));
    bot.on('reconnecting', () => console.log('Bot đang được kết nối!'));
    let reaction_numbers = [":zero:",":one:",":two:",":three:",":four:",":five:"];
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
        let ID = video2.id;
        let Title = video2.title;
        let Duration = video2.duration;
        let Url = `https://www.youtube.com/watch?v=${ID}`;
        let Thumbnail = `https://img.youtube.com/vi/${ID}/0.jpg`;
        
	await handleVideo(ID, Title, Duration, Url, Thumbnail, message, voiceChannel, true); 
	}
     return message.channel.send(`✅ Bài hát đã được thêm vào danh sách!`);
	} else if(url.match(/^https?:\/\/(www.soundcloud.com|soundcloud.com)\/(.*)$/)){
      try {
        let {body} = await superagent
    	    .get(`http://api.soundcloud.com/resolve.json?url=${args.join(' ')}&client_id=${process.env.SOUNDCLOUD_API}`);
        if(body.tracks) message.channel.send('Danh sách phát không hợp lệ!');
        else if (body.id) {
            let Title = body.user.username + " - " + body.title;
            let Duration = Time(body.duration / 1000);
            let ID = body.id;
            let Url = body.permalink_url;
            let Thumbnail = body.artwork_url;
            
            await handleVideo(ID, Title, Duration, Url, Thumbnail, message, voiceChannel, true); 
        }
      } catch(err) {
         console.error(err);
         message.channel.send('Link không hợp lệ, bạn vui lòng thử lại.'); 
      }
    } else {
                try {
                    var video = await youtube.getVideo(url);
                    var ID = video.id;
                    var Title = video.title;
                    var Duration = video.duration;
                    var Url = `https://www.youtube.com/watch?v=${ID}`;
                    var Thumbnail = `https://img.youtube.com/vi/${ID}/0.jpg`;
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
                });

                   try {
                        var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 6, {
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
                   var ID = video.id;
                   var Title = video.title;
                   var Duration = video.duration;
                   var Url = `https://www.youtube.com/watch?v=${ID}`;
                   var Thumbnail = `https://img.youtube.com/vi/${ID}/0.jpg`;
				} catch (err) {
					console.error(err);
					return message.channel.send('Không tìm thấy kết quả!');
				}
			}
			return handleVideo(ID,Title,Duration,Url,Thumbnail,message,voiceChannel);
}

async function handleVideo(ID,Title,Duration,Url,Thumbnail,message,voiceChannel,playlist = false) {
    const serverQueue = ops.active.get(message.guild.id);

    if(Url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/(.*)$/)) {
      var song = {
	      id: ID,
	      title: Title,
   	      duration: generateTime(Duration.hours,Duration.minutes,Duration.seconds),
	      url: `https://www.youtube.com/watch?v=${ID}`,
              thumbnail: Thumbnail
	    }
    } else {
      var song = {
	      id: ID,
	      title: Title,
   	      duration: Duration,
	      url: `http://api.soundcloud.com/tracks/${ID}/stream?consumer_key=${process.env.SOUNDCLOUD_API}`,
              thumbnail: Thumbnail
	    }
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
			  console.error(`Bot không thể vào được voice channel: ${error}`);
			  ops.active.delete(message.guild.id);
			  return message.channel.send(`Bot không thể vào được voice channel: ${error}`);
		  }
    } else {
		  serverQueue.songs.push(song);
		  //console.log(serverQueue.songs);
		  if (playlist) return undefined;
		  else return message.channel.send(`✅ Bài hát đã được thêm vào danh sách!`);
	}
	return undefined;
}
  
function play(guild, song){
	const serverQueue = ops.active.get(guild.id);
  

	if (!song) {
		serverQueue.voiceChannel.leave();
		ops.active.delete(guild.id);
		return;
	}

  
  let url = song.url;
  
  if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/(.*)$/)){
      var stream = ytdl(url);
  } else var stream = url;
  
  //console.log(song);
	const dispatcher = serverQueue.connection.playStream(song.url)
		  .on('end', reason => {
      message.channel.send('Kết thúc bài hát!');
      console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  
  const mEmbed = new Discord.RichEmbed()
      .setColor('#4286f4')
      .setThumbnail(song.thumbnail)
      .addField(`================================================`,`
🎶 Đang phát nhạc: **${song.title}**  
0:00 :white_circle:─────────────────────────────── ${song.duration}
◄◄⠀▐▐ ⠀►►⠀⠀　　        　　 :gear: ❐ ⊏⊐ 
=============================================== `)
  serverQueue.textChannel.send(mEmbed);
  }
}

let generateTime = (hour,minute,second) =>{
      if(hour === 0){ 
      	if(second>10) return `${minute}:${second}`;
      	else if(second<10) return `${minute}:0${second}`;
        else return `${minute}:${second}`;
      } else {
      	if(minute<10 && second<10) return `${hour}:0${minute}:0${second}`;
      	else if(minute<10 && second>10) return `${hour}:0${minute}:${second}`;
      	else if(minute>10 && second<10) return `${hour}:${minute}:0${second}`;
        else return `${minute}:${second}`;
      }
}

let Time = (time) => {   
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;
    var ret = "";
    if (hrs > 0)
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

module.exports.config = {
  command: 'play',
  category: 'Music',
  description: "Dùng để phát nhạc",
  usage: ">>play [tên bài hát hoặc link]"
}

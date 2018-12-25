//npm install ytdl-core opusscript
const ytdl = require('ytdl-core');
const Discord= require("discord.js" );

module.exports.run = async(bot,message,args)=>{
	if(!message.member.voiceChannel) return message.channel.send("You have to connect to a voice channel");
	if(message.guild.me.voiceChannel) return message.channel.send("Bot is already connected");
	if(!args[0]) return message.channel.send("pls input a url");
	const voiceChannel = message.member.voiceChannel;
	const info = ytdl.getInfo(args[0]);
	voiceChannel.join()
      .then(connection => {
        const stream = ytdl(args[0], { filter: 'audioonly' });
        const dispatcher = connection.playStream(stream);
      });
      message.channel.send(`Playing ${info.title}`);
}
module.exports.config ={
	command: "play"
}
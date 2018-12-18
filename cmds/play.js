// //npm install ytdl-core opusscript
const ytdl = require('ytdl-core');
const Discord= require("discord.js" );
//const url = args[0];

module.exports.run = async(bot,message,args)=>{
	if(!message.member.voiceChannel) return message.channel.send("You have to connect to a voice channel");
	if(message.guild.me.voiceChannel) return message.channel.send("Bot is already connected");
	if(!args[0]) return message.channel.send("pls input a url");

	let validate = await ytdl.validateURL(args[0]);

	if(!validate) return;

	let info = await ytdl.getInfo(args[0]);
	let connection = await message.member.voiceChannel.join();

	let dispatcher = await connection.playStream(ytdl(args[0],{filter:'audioonly'}));
	message.channel.send(`Now playing ${info.title}`);
}
module.exports.config ={
	command: "play"
}
const Discord= require("discord.js" );
module.exports.run = async(bot,message,args) =>{
	let userCreated = message.author.createdAt.toString().split(' ');
	let userJoined = message.channel.guild.joinedAt.toString().split(' ');
	let embed = new Discord.RichEmbed()
		.addField("User name",message.author.username)
		.addField("ID",message.author.id)
		.addField("Created at",userCreated[1] +','+userCreated[2]+' '+userCreated[3])
		.addField("Joined server at",userJoined[1] +','+userJoined[2]+' '+userJoined[3])
		.setColor("#3399ff")
		.setThumbnail(message.author.avatarURL)
	message.channel.sendEmbed(embed);
}

module.exports.config = {
	command: "userinfo"
}

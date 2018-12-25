const Discord = require("discord.js");

module.exports.run = async(bot,message,args) =>{
	let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
	let serverCreated = message.guild.createdAt.toString().split(' ');
	let servericon = message.guild.iconURL;
	let serverembed = new Discord.RichEmbed()
		.addField('Tạo server lúc: ',serverCreated[1]+','+serverCreated[2]+' '+serverCreated[3])
		.addField('Tên ID: ',message.guild.id,true)
		.addField('Tên server: ',message.guild.name,true)
		.addField('Chủ server: ',message.guild.owner.user.tag,true)
		.addField('Tổng số thành viên trong server: ',message.guild.memberCount,true)
		.addField('Tổng số người: ',message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size,true)
		.addField('Tổng số bot: ',message.guild.members.filter(m => m.user.bot).size,true)
		.addField('Số người online: ',online.size,true)
		.setColor('#3399ff')
		.setThumbnail(servericon)
		.setAuthor(message.guild.name,servericon);
	message.channel.send(serverembed);
}

module.exports.config = {
	command: 'serverinfo'
}
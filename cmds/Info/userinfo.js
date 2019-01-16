const Discord= require("discord.js" );
const moment = require("moment")
module.exports.run = async(bot,message,args,db) =>{
	let mention = message.mentions.members.first() || message.member;
	let member = message.mentions.users.first() || message.author;
	let embed = new Discord.RichEmbed()
		.addField("User name: ",mention.user.tag,true)
		.addField("Nick name: ",`${mention.nickname !== null ? `${member.nickname}` : 'Chưa có'}`, true)
		.addField("ID",mention.id,true)
		.addField("Tình trạng: ",`${mention.presence.status}`,true)
		.addField("Playing: ",`${mention.presence.game ? `:video_game: ${mention.user.presence.game.name}`: "Not playing"}`,true)
		.addField("Tạo tài khoản lúc: ",`${moment.utc(mention.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`,true)
		.addField("Vào server lúc: ",`${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`,true)
		.setColor("#3399ff")
		.setFooter(`Information about ${mention.username}`)
		.setThumbnail(member.avatarURL)
	message.channel.sendEmbed(embed);
}

module.exports.config = {
	command: "userinfo"
}

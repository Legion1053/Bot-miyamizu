const Discord = require('discord.js');

module.exports.run = async(bot,message,args) =>{
	let replies = ['Ừ, chắc chắn rồi','Không bao giờ ','Bạn thử hỏi lại xem','Có thể đó','Ừ,cũng có thể','Chưa chắc chắn lắm'];
	let question = args.slice().join(" ");
	let result = Math.floor(Math.random()*replies.length);
	let embed = new Discord.RichEmbed()
		.addField(`:speech_balloon: ${replies[result]}. :8ball:`)
		.setColor('RANDOM');
	message.channel.send(embed);
}

module.exports.config = {
	command: '8ball',
  	category: 'Fun'
}

const Discord = require('discord.js');

module.exports.run = async(bot,message,args) =>{
	let replies = ['Ừ, chắc chắn rồi','Không bao giờ ','Bạn thử hỏi lại xem','Có thể đó','Ừ,cũng có thể','Tốt nhất không nên nói cho bạn'];
	let question = args.slice().join(" ");
	let result = Math.floor(Math.random()*replies.length);
	
	message.channel.send(`:speech_balloon: Trả lời, ${replies[result]}. :8ball:`);
}

module.exports.config = {
	command: '8ball',
  category: 'Fun',
  description: "Dùng để trả lời câu hỏi ",
  usage: ">>8ball [câu hỏi]"
}

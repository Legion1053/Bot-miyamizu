const Discord = require('discord.js');

module.exports.run = async(bot,message,args) =>{
	let num = Math.floor((Math.random()*100)+1);

	message.channel.send('Bạn hãy đoán số trong khoảng từ 1 đến 100 :thinking:')

	let i=0;
	let sender = message.content;
	let author = message.author;
	let win = false;

	while(i<5){
		if(sender.id === author.id){
			if(sender === num) {
				return message.channel.send('Chúc mừng, bạn đã đoán đúng ');
				win = true;
			}
			else if(sender < num) message.channel.send('Số bạn cần tìm lớn hơn cơ');
			else if(sender > num) message.channel.send('Số bạn cần tìm nhỏ hơn cơ');
			i++;
		}
		else if(sender.id !== author.id) message.channel.send('Bạn phải đợi người chơi khác hoàn thành đã!')
	}
	if(win == false) return message.channel.send(`Sai, số cần tìm là: **${num}**`);
}

module.exports.config ={
	command: 'number'
}	
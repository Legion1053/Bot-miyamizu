const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{
	let {body} = await superagent
    .get(`https://nekos.life/api/v2/img/hug`);
    let mention = message.mentions.users.first();
    if (!mention) return message.channel.send(`Bạn phải chọn người để ôm đã :|`).then(msg => {
    	msg.delete(3000)
  	});
    else if(args[0] === '<@514823687560757268>') message.channel.send(`Aww cảm ơn bạn XD ${body.url}`);	    
    else message.channel.send(`**${message.author.username}** vừa ôm **${mention.username}** kìa :hearts: ${body.url}`);
}

module.exports.config = {
	command: 'hug'
}
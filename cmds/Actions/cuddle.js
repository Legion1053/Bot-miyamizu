const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{
	let {body} = await superagent
    	.get(`https://nekos.life/api/v2/img/cuddle`);
    let mention = message.mentions.users.first();
    if (!mention) return message.channel.send(`Bạn phải chọn người để âu yếm đã :3`).then(msg => {
    	msg.delete(3000)
  	});
    else if(args[0] === '<@514823687560757268>') message.channel.send(`Nào ngoan ngoan, **${message.author.username}** :hearts: ${body.url}`);	
    else message.channel.send(`**${message.author.username}** vừa âu yếm **${mention.username}** kìa :3 ${body.url}`);
}
module.exports.config = {
	command: 'cuddle'
}
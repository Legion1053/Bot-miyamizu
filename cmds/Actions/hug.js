const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{
	let {body} = await superagent
    .get(`https://nekos.life/api/v2/img/hug`);
  const Emb = new Discord.RichEmbed()
      .setImage(body.url);
  let mention = message.mentions.users.first();
  if (!mention) return message.channel.send(`Bạn phải chọn người để ôm đã :|`).then(msg => {
    	msg.delete(3000)
  });
  else if(args[0] === '<@514823687560757268>') message.channel.send(`Aww cảm ơn bạn XD`,{embed: Emb});	    
  else message.channel.send(`**${message.author.username}** vừa ôm **${mention.username}** kìa :hearts:`,{embed: Emb});
}

module.exports.config = {
	command: 'hug',
  	category: 'Actions',
  	description: 'Dùng để ôm ai đó <3',
  	usage: '>>hug [@user]',
  	aliases: []
}

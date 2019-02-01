const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{
	let {body} = await superagent
    	.get(`https://nekos.life/api/v2/img/feed`);
  const Emb = new Discord.RichEmbed()
      .setImage(body.url);
  let mention = message.mentions.users.first();
  if (!mention) return message.channel.send(`Bạn phải chọn người để cho ăn đã :3`).then(msg => {
    	msg.delete(3000)
  });
  else if(args[0] === '<@514823687560757268>') message.channel.send(`Yummy Yummy :yum:`,{embed: Emb});	  
  else message.channel.send(`**${message.author.username}** vừa cho **${mention.username}** ăn kìa :3`,{embed: Emb}); 
}

module.exports.config = {
	command: 'feed',
  category: 'Actions',
  description: 'Dùng để cho ai đó ăn :3',
  usage: '>>feed [@user]'
}

const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot,message,args,db) =>{
	let {body} = await superagent
    	.get(`https://nekos.life/api/v2/img/slap`);
  const Emb = new Discord.RichEmbed()
      .setImage(body.url);
  let mention = message.mentions.users.first();
  if (!mention) return message.channel.send(`Bạn phải chọn người để tát đã :v`).then(msg => {
    	msg.delete(3000)
  });
  else if(args[0] === '<@514823687560757268>') message.channel.send(`**:(** `,{embed: Emb});	
  else message.channel.send(`**${message.author.username}** vừa tát **${mention.username}** kìa :cold_sweat:`,{embed: Emb});
}

module.exports.config = {
	command: 'slap',
  	category: 'Actions',
  	description: 'Dùng để tát ai đó :v',
  	usage: '>>slap [@user]',
  	aliases: []
}

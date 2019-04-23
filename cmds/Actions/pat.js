const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{
	let {body} = await superagent
    	.get(`https://nekos.life/api/v2/img/pat`);
  const Emb = new Discord.RichEmbed()
      .setImage(body.url);
  let mention = message.mentions.users.first();
  if (!mention) return message.channel.send(`Bạn phải chọn người để xoa đầu đã :3`).then(msg => {
    	msg.delete(3000)
  });
  else if(args[0] === '<@514823687560757268>') message.channel.send(`Aww cảm ơn bạn nha :3`,{embed: Emb});	
  else message.channel.send(`**${message.author.username}** vừa xoa đầu **${mention.username}** kìa :innocent: `,{embed: Emb});
}

module.exports.config = {
	command: 'pat',
  	category: 'Actions',
  	description: 'Dùng để xoa đầu ai đó XD',
  	usage: '>>pat [@user]',
  	aliases: []
}

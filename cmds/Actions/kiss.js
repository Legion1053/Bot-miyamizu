const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{
	let {body} = await superagent
		.get(`https://nekos.life/api/v2/img/kiss`)
  const Emb = new Discord.RichEmbed()
      .setImage(body.url);
	let mention = message.mentions.users.first();
  if (!mention) return message.channel.send(`Bạn phải chọn người để hôn đã :|`).then(msg => {
    	msg.delete(3000)
  });
  else if(args[0] === '<@514823687560757268>') message.channel.send(`<3`,{embed: Emb});	  
  else message.channel.send(`**${message.author.username}** vừa hôn **${mention.username}** kìa :kissing_heart: `,{embed: Emb});

}

module.exports.config ={
	command: 'kiss',
  	category: 'Actions',
  	description: 'Dùng để hôn ai đó XD',
  	usage: '>>kiss [@user]'
}

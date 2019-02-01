const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{ 
	let {body} = await superagent
    	.get(`https://api.tenor.com/v1/random?q=anime+happy+dance&key=${process.env.TENOR_API}&limit=1`);
  const Emb = new Discord.RichEmbed()
      .setImage(body.results[0].media[0].gif.url);
  let mention = message.mentions.users.first();
  if (!mention) return message.channel.send(`Bạn phải chọn người để nhảy đã :3`).then(msg => {
    	msg.delete(3000)
  });
  else if(args[0] === '<@514823687560757268>') message.channel.send(`Nhảy nào XD`,{embed: Emb});	
  else message.channel.send(`**${message.author.username}** vừa mời **${mention.username}** nhảy cùng kìa XD`,{embed: Emb});
}

module.exports.config ={
	command: 'dance',
  category: 'Actions',
  description: 'Dùng để nhảy với ai đó',
  usage: '>>dance [@user]'
}

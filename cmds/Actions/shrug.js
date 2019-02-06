const Discord = require('discord.js');
const superagent = require("superagent");

module.exports.run = async(bot,message,args,db) =>{ 
	let {body} = await superagent
    	.get(`https://api.tenor.com/v1/random?q=anime+shrug&key=10LA8OYRLBFU&limit=1`);
  const Emb = new Discord.RichEmbed()
      .setImage(body.results[0].media[0].gif.url); 
  message.channel.send(`¯\\_\(ツ)\_\/¯ `,{embed: Emb});
}

module.exports.config ={
	command: 'shrug',
  category: 'Actions',
  description: `Dùng để ¯\\_\(ツ)\_\/¯`,
  usage: '>>shrug'
}

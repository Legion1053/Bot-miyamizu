const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{
	let {body} = await superagent
    	.get(`https://nekos.life/api/v2/img/tickle`);
  let mention = message.mentions.users.first();
  const Emb = new Discord.RichEmbed()
      .setImage(body.url);
    if (!mention) return message.channel.send(`Bạn phải chọn người để "cù" đã :3`).then(msg => {
    	msg.delete(3000)
  	});
    else if(args[0] === '<@514823687560757268>' ) message.channel.send(`*Hi hi hi nhột quá* :joy: `,{embed: Emb});	  
    else message.channel.send(`**${message.author.username}** vừa "cù" **${mention.username}** kìa :joy: `,{embed: Emb});
}

module.exports.config = {
	command: 'tickle',
  	category: 'Actions',
  	description: 'Dùng để cù ai đó :3',
  	usage: '>>tickle [@user]'
}

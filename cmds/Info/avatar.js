const Discord = require('discord.js');

module.exports.run = async(bot,message,args) =>{
	let mention = message.mentions.users.first() || message.author;
  let image = mention.avatarURL;
  if(!image) return message.channel.send('Người chơi này chưa có avatar!');
  else {
	  let embed = new Discord.RichEmbed()
      .setAuthor(`Avatar của ${mention.username}`)
      .setImage(image)
    return message.channel.send(embed);
  }
}

module.exports.config = {
	command: "avatar",
  category: "Info"
} 

const Discord = require('discord.js');

module.exports.run = async(bot,message,args,ops) =>{
    let mention = message.mentions.users.first() || message.author;
    if (message.author.bot || !message.guild) return;
    let score = bot.getScore.get(mention.id, message.guild.id);
    if (!score) {
      score = { id: `${message.guild.id}-${mention.id}`, user: mention.id, guild: message.guild.id, points: 0, level: 1 };
    }
    let curxp = score.points;
    let curlvl = score.level ;
  
    let nxtLvlXp = curlvl * 400 + Math.round(Math.sqrt(score.points));
    //console.log(nxtLvlXp);
    
    let difference = nxtLvlXp - curxp;
  
    let lvEmbed = new Discord.RichEmbed()
        .setAuthor(mention.username)
        .setThumbnail(mention.displayAvatarURL)
        .setColor('#42f46b')
        .addField('Level ',score.level)
        .addField('XP ',score.points)
        .setFooter(`Còn ${difference} xp nữa để lên level tiếp theo`,message.author.displayAvatarURL);
    message.channel.send(lvEmbed);
}

module.exports.config = {
  command: 'xp',
  catefory: 'Info',
  description: "Dùng để kiểm tra xp hiện tại",
  usage: ">>xp"
}

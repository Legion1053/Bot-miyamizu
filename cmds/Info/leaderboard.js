const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');

module.exports.run = async(bot,message,args) =>{
     const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);

    // Now shake it and show it! (as a nice embed, too!)
    const embed = new Discord.RichEmbed()
      .setTitle("Bảng xếp hạng top 10")
      .setColor(0x00AE86)
      .setFooter(message.author.username,message.author.displayAvatarURL);

    for(const data of top10) {
      embed.addField(bot.users.get(data.user).tag, `${data.points} xp (level ${data.level})`);
    }
    return message.channel.send({embed});
}

module.exports.config = {
    command: 'leaderboard',
    category: 'Info',
    description: 'Xem bảng xếp hạng trong server',
    usage: '>>leaderboard'
}

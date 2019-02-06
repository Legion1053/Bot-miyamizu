const db = require('quick.db');
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

 let mention = message.mentions.users.first() || message.author;
        
        let balance = await db.fetch(`userBalance_${mention.id}`);
        
        if (balance === null) balance = 50;
        
        let embed = new Discord.RichEmbed()
          .setTitle('Tổng số tiền')
          .setDescription(`${mention.username}, bạn có **${balance}** :dollar: trong tài khoản`)
          .setColor('#ffff00')
        message.channel.send(embed)

}

module.exports.config = {
  command: 'balance',
  category: 'Economy',
  description: "Dùng để kiểm tra số tiền hiện tại của mình, hoặc của người khác",
  usage: ">>balance [@user]"
}

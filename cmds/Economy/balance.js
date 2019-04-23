const Discord = require('discord.js');

module.exports.run = async(bot,message,args,ops,coin) => {
   let mention = message.mentions.users.first() || message.author;
      try{
      coin.findOne({
            userID: mention.id,
        },(err,res) =>{
            if(err) {
              console.log(err);
              return message.channel.send('Nguời này chưa khởi tạo profile!');
            }
            let embed = new Discord.RichEmbed()
                .setTitle('Tổng số tiền')
                .setDescription(`${mention.username}, bạn có **${res.money}**đ trong tài khoản`)
                .setColor('#ffff00')
        return message.channel.send(embed)
        })
   } catch(err) {
          throw err;
          return message.channel.send('Nguời này chưa khởi tạo profile!');
   }
}

module.exports.config = {
  command: 'balance',
  category: 'Economy',
  description: "Dùng để kiểm tra số tiền hiện tại của mình, hoặc của người khác",
  usage: ">>balance [@user]",
  aliases: ['bal','money']
}

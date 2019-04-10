const Discord = require('discord.js');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}/${process.env.DB}`,{
  useNewUrlParser: true
});

module.exports.run = async(bot,message,args,ops,coin) => {
      let mention = message.mentions.users.first() || message.author;
  
      coin.findOne({
            userID: mention.id,
        },(err,res) =>{
            if(err) console.log(err);
            if(!res){
            const newDoc = new coin({
                userID: mention.id,
                steak: 1,
                money: 200,
                lastDaily: 0
            })
        newDoc.save().catch(err => console.log(err));
        } else {
            let embed = new Discord.RichEmbed()
                .setTitle('Tổng số tiền')
                .setDescription(`${mention.username}, bạn có **${res.money}**đ trong tài khoản`)
                .setColor('#ffff00')
            message.channel.send(embed)
        }
      })
}

module.exports.config = {
  command: 'balance',
  category: 'Economy',
  description: "Dùng để kiểm tra số tiền hiện tại của mình, hoặc của người khác",
  usage: ">>balance [@user]"
}

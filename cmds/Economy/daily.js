const Discord = require('discord.js');
const mongoose = require('mongoose');
const ms = require('parse-ms');

module.exports.run = async(bot,message,args,ops,coin)=>{
	let cooldown = 8.64e+7;
  	let daily = 250;
  	try {
  	coin.findOne({
            userID: message.author.id,
        },(err,res) =>{
            if(err) console.log(err);
            if(!res){
            const newDoc = new coin({
                userID: message.author.id,
                steak: 1,
                money: 1000,
                lastDaily: Date.now()
        })
        newDoc.save().catch(err => console.log(err));
        
        res.lastDaily = Date.now();
        res.money += daily;
            let embed = new Discord.RichEmbed()
                .setTitle('Tiền thưởng hằng ngày')
                .setDescription(`Bạn đã nhận được 250đ từ tiền thưởng mỗi ngày`)
                .setColor('#ffff00')
                .setFooter(message.author.tag)
            message.channel.send(embed);
        res.save().catch(err => console.error(err));
        } else if (res.lastDaily !== null && cooldown - (Date.now() - res.lastDaily) > 0) {
            let timeObj = ms(cooldown - (Date.now() - res.lastDaily));
            let lastDailyEmbed = new Discord.RichEmbed()
                .setAuthor(`Lần nhận thưởng tiếp theo`)
                .setColor('#ffff00')
                .setDescription(`Bạn chỉ có thể nhận được tiền thưởng trong: **${timeObj.hours} giờ ${timeObj.minutes} phút** nữa!`)
                .setFooter(message.author.tag)
            message.channel.send(lastDailyEmbed);
        } else {
            res.lastDaily = Date.now();
            res.money += daily;
            let embed = new Discord.RichEmbed()
                .setTitle('Tiền thưởng hằng ngày')
                .setDescription(`Bạn đã nhận được **250**đ từ tiền thưởng mỗi ngày`)
                .setColor('#ffff00')
                .setFooter(message.author.tag)
            message.channel.send(embed);
          res.save().catch(err => console.error(err));
        }
      })
  } catch(err){
      console.error(err);
  }
}

module.exports.config = {
	command: 'daily',
 	category: 'Economy',
  	description: "Dùng để đưa bạn 250đ mỗi ngày",
  	usage: ">>daily",
  	aliases: []
}

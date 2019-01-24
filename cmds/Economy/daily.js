const Discord = require('discord.js');
const moment = require('moment');
const db = require('quick.db');

module.exports.run = async(bot,message,args)=>{  
  let lastDaily = await db.fetch(`lastDaily_${message.author.id}`);
    try {
    db.fetch(`userBalance_${message.member.id}`).then(bal => {
    if(bal == null||0){
        db.set(`userBalance_${message.member.id}`, 50) }
    if(!lastDaily) lastDaily = 'null';
    else if (lastDaily != moment().format('L')) {
       	db.set(`lastDaily_${message.author.id}`, Date.now());
        db.add(`userBalance_${message.member.id}`, daily).then(i => {
          let embed = new Discord.RichEmbed()
          .setTitle('Tiền thưởng hằng ngày')
          .setDescription(`Bạn đã nhận được 250$ từ tiền thưởng mỗi ngày`)
          .setColor('#ffff00')
          .setFooter(message.author.tag)
          message.channel.send(embed);
        })
    }
    else {
        let lastDailyEmbed = new Discord.RichEmbed()
          .setAuthor(`Next Daily`)
          .setColor('#ffff00')
          .setDescription(`Bạn chỉ có thể nhận được tiền thưởng trong: **moment().endOf('day').fromNow()**!`)
          .setFooter(message.author.tag)
        message.channel.send(lastDailyEmbed);
    })} 

        
    } 
    catch(err) {
        console.log(err)
    }
}

module.exports.config = {
	command: 'daily',
  category: 'Economy'
}

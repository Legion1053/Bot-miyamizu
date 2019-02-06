const Discord = require('discord.js');
const moment = require('moment');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports.run = async(bot,message,args)=>{
	let cooldown = 8.64e+7;
  let daily = 250;
  
  let lastDaily = await db.fetch(`lastDaily_${message.author.id}`);
    try {
    db.fetch(`userBalance_${message.member.id}`).then(bal => {
    if(bal == null||0){
        db.set(`userBalance_${message.member.id}`, 50)}

    else if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastDaily));
        console.log(Date.now() - lastDaily);

        let lastDailyEmbed = new Discord.RichEmbed()
          .setAuthor(`Lần nhận thưởng tiếp theo`)
          .setColor('#ffff00')
          .setDescription(`Bạn chỉ có thể nhận được tiền thưởng trong: **${timeObj.hours} giờ ${timeObj.minutes} phút** nữa!`)
          .setFooter(message.author.tag)
        message.channel.send(lastDailyEmbed);
    } else {
        db.set(`lastDaily_${message.author.id}`, Date.now());
        db.add(`userBalance_${message.member.id}`, daily).then(i => {
          let embed = new Discord.RichEmbed()
          .setTitle('Tiền thưởng hằng ngày')
          .setDescription(`Bạn đã nhận được 250$ từ tiền thưởng mỗi ngày`)
          .setColor('#ffff00')
          .setFooter(message.author.tag)
          message.channel.send(embed);
        })}
    })} 
    catch(err) {
        console.log(err)
    }
}

module.exports.config = {
	command: 'daily',
 	category: 'Economy',
  	description: "Dùng để đưa bạn 250$ mỗi ngày",
  	usage: ">>ping"
}

const Discord = require('discord.js');
const weather = require('weather.js');

module.exports.run = async(bot,message,args) =>{
    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
      if (err) message.channel.send(err);
      if (result === undefined || result.length === 0) {
          return message.channel.send('**Bạn phải nhập địa điểm đã!*');
      }
      let current = result[0].current;
      let location = result[0].location;
      const embed = new Discord.RichEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`Thời tiết tại ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setColor(0x00AE86)
          .addField('Múi giờ',`UTC${location.timezone}`, true)
          .addField('Đơn vị đo nhiệt độ',location.degreetype, true)
          .addField('Nhiệt độ',`${current.temperature} Degrees`, true)
          .addField('Cảm giác ', `${current.feelslike} Degrees`, true)
          .addField('Gió',current.winddisplay, true)
          .addField('Độ ẩm', `${current.humidity}%`, true)
          message.channel.send(embed);
    })
}

module.exports.config = {
   command: 'weather',
   category: 'Info',
  description: "Dùng để kiểm tra thời tiết",
  usage: ">>weather"
}

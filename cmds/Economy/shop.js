const items = require('../../util/json/backgrounds.json');
const Discord = require('discord.js');

const registerItems = (source, target) => {
    let categories = []; 

        for (var i in source) { 
          if (!categories.includes(source[i].type)) {
              categories.push(source[i].type)
          }
      }

      for (var i = 0; i < categories.length; i++) { 
        var tempDesc = '';
          for (var c in source) { 
              if (categories[i] === source[c].type) {
                  let priceRange = source[c].price;
                  tempDesc += ` **[${source[c].name}](${source[c].link})**\n\`Giá: ${source[c].cost}đ\`\n\n`; 
              }
            }
           target.addField(`SHOP: ${categories[i]} (page 2)`,tempDesc);           
      }
}

module.exports.run = async(bot,message,args,ops,coin) => {
    const page1 = new Discord.RichEmbed();
    page1.setThumbnail(bot.user.displayAvatarURL)
    registerItems(items.Background, page1);
    message.channel.send(page1);
}

module.exports.config = {
   command: 'shop',
   category: 'Economy',
   description: "Dùng để hiện ra các items bạn muốn mua trong shop",
   usage: ">>shop",
   aliases: []
}

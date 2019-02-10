const superagent = require('superagent');
const Discord = require('discord.js');

var gameData = {
    "active": false,
    "stage": 1
};
var id = [16460,15786,411,2536,32511,15788,413,39556,221,11441,2818,32510,35729,37854,1173,388,48622,2,40346,31706,57048,38505,25930,19268,27158,219,6553,29872,5451,22846,29657,26768,2599,35731,4956,27165,220,4119,59254,32961,27157,29869,16458];
module.exports.run = async(bot,message,args) =>{
    try{
    if(gameData.active === true) return message.channel.send('Câu lệnh này đang được sử dụng.');
    else {
        gameData.active = true;
        while(gameData.stage > 0){
            let num = Math.floor((Math.random()*40)+0);
	          let {body} = await superagent
		            .get(`https://kitsu.io/api/edge/characters/${id[num]}`);
            const answers = body.data.attributes.name.toLowerCase();
            let link = `https://media.kitsu.io/characters/images/${id[num]}/original.jpg?1483096805`;
            let Embed = new Discord.RichEmbed()
                .setTitle('Nhân vật anime')
                .setDescription(`Đoán tên nhân vật anime dưới đây 

(Nếu ảnh bị lỗi, nhấn vào [đây](${link}))`)
                .setImage(link)
                .setFooter('Bạn có 15 giây để trả lời')
            await message.channel.send({embed: Embed});
   
  
            const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
				        max: 1,
				        time: 15000
			      });
          if (!msgs.size) {
            message.channel.send(`Thời gian đã kết thúc, kết quả đúng là: ${answers}.`);
            --gameData.stage;
            continue; 
          }
          if (!answers.includes(msgs.first().content.toLowerCase())){
              message.channel.send(`Sai, kết quả đúng là ${answers}.`);
          } 
          else if(answers.includes(msgs.first().content.toLowerCase())) {
              message.channel.send('Chúc mừng bạn đã đoán đúng!');
              
          }
          if(gameData.stage <= 0) {
              break;
          }
          --gameData.stage;
        }
        gameData.active = false;
        gameData.stage = 5;
        return message.channel.send('Kết thúc trò chơi!');
      }
    } catch(e){
        gameData.active = false;
        gameData.stage = 5; 
        console.log(e);
    }
}

module.exports.config = {
   command: 'gameanime',
   description: 'Trò chơi đoán nhân vật anime',
   usage: '>>gameanime [số lần chơi]'
}

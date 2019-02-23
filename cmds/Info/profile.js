const Discord = require('discord.js');
const {createCanvas,loadImage,Image} = require('canvas');
const {get} = require('snekfetch');

module.exports.run = async(bot,message,args,db) =>{    
    
//     let score = bot.getScore.get(mention.id, message.guild.id);
//     if (!score) {
//       score = { id: `${message.guild.id}-${mention.id}`, user: mention.id, guild: message.guild.id, points: 0, level: 1 };
//     }
//     let curxp = score.points;
//     let curlvl = score.level ;
//     let nxtLvlXp = curlvl * 400 + Math.round(Math.sqrt(score.points));
//     let difference = nxtLvlXp - curxp;
//     const fillValue = Math.min(Math.max(curxp / nxtLvlXp, 0), 1);
  
//     let money = await db.fetch(`userBalance_${mention.id}`);
//     if (money === null) money = 50;
    let mention = message.mentions.users.first() || message.author;
    let avatarURL = /\?size=2048$/g;
    let {body: avatar} = await get(mention.displayAvatarURL.replace(avatarURL,"?size=128"));
    let canvas = createCanvas(400,350);
    let ctx = canvas.getContext('2d');
    const {body:buffer} = await get('https://cdn.glitch.com/6cb92f63-8862-4223-91b7-2e146f1b9a65%2Fbackground-2579719_960_720.jpg?1550572087812');
    const background = await loadImage(buffer);
    const pavatar = await loadImage(avatar);
    const base = new Image();
		//const cond = new Image();
    const generate = () =>{
        ctx.drawImage(background, 0, 0);
			  // ctx.patternQuality = 'billinear';
			  // ctx.filter = 'bilinear';
			  // ctx.antialias = 'subpixel';
			  // ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
			  // ctx.shadowOffsetY = 2;
			  // ctx.shadowBlur = 2;
        
   ctx.fillStyle = '#4eb2ed';
        ctx.fillRect(50,0,350,350);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(150,170,240,24.5);
        ctx.fillStyle = '#429bf4';
        ctx.fillRect(154,173.5,167.5,17);

//ctx.fillStyle('#54534e');
        ctx.save();
        ctx.fillStyle = '#81868c';
        ctx.fillRect(0,0,50,350);
       	ctx.globalCompositeOperation = "multiply"
        ctx.fillStyle = "rgba(128,128,128,0.5)"
        ctx.fillRect(50,115,350,45);
		ctx.restore();
        
       	ctx.save();
        ctx.fillStyle = '#4f5256';
        ctx.fillRect(50,160,92,190);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(145,270,250,75);
        ctx.restore();
        text();
        ctx.beginPath();
        // ctx.globalCompositeOperation = 'destination-out';
        // ctx.strokeStyle = '#000';
        ctx.arc(95, 118, 62, 0, Math.PI * 2, true);
        
        ctx.closePath();
        ctx.clip();
        
        ctx.drawImage(pavatar,30,53,128,128);
        ctx.stroke();
    }
    const text = () =>{
        ctx.font = "20px Arial";
        ctx.fillStyle = '#4a4d54';
        ctx.font = "20px Arial"
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Legion1053',160,145);
        ctx.fillStyle = '#4a4d54';
        ctx.fillText('LEVEL',165,218);
        ctx.font = "bold 35px Arial"
        ctx.fillText('36',175,255);
        ctx.font = "15px Arial";
        ctx.fillText('Description',152,285);
        ctx.fillText('XP: 1642/5060',200,186.5);
        ctx.font = "18px Arial`";
        ctx.fillText('Global rank #1',240,218)
        ctx.fillText('Server rank #1',240,255);
    }
    generate();
    
    
    await message.channel.send(new Discord.Attachment(await canvas.toBuffer(), 'profile.png'));
}

module.exports.config = {
    command: 'profile'
}

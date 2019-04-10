const Discord = require('discord.js');
const prefix = '>>';
const bot = new Discord.Client();
const fs = require('fs');

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}/${process.env.DB}`,{
  useNewUrlParser: true
});

const Exp = require('./models/Exp.js');
const coin = require('./models/Money.js');

const OID = process.env.OWNER_ID;
const active = new Map();

bot.commands = new Discord.Collection();

let loadCmds = (link)=>{
fs.readdir(`./cmds/${link}/`,(err,files)=>{
	if(err) console.error(err);//Send an error message if it gets an error
	//Check if the file extension is 'js' or the text after dot is 'js'
	let jsfiles = files.filter(f => f.split('.').pop()==='js');
	if(jsfiles.length <= 0) return console.log('Không tìm thấy câu lệnh nào...');
	else console.log(jsfiles.length+' câu lệnh được tìm thấy');

 	jsfiles.forEach((f,i)=>{ //Loop though each file and run the following code
		delete require.cache[require.resolve(`./cmds/${link}/${f}`)];//This delete the cached file that you spectify
    let cmds = require(`./cmds/${link}/${f}`);// Gets every js file in the chosen folder
		console.log(`file ${f} đang chạy...`);
		bot.commands.set(cmds.config.command,cmds);
	});
});
}

bot.on("ready", () =>{
	console.log(`Bot ${bot.user.username} sẵn sàng`);
	bot.user.setStatus("Idle");
	bot.user.setActivity(">>help để trợ giúp",{type: "PLAYING"});
});

loadCmds('Info');
loadCmds('Fun');
loadCmds('Actions');
loadCmds('Economy');
loadCmds('Music');
//loadCmds('WereWolf');

bot.on('message',(message,guild) =>{ 
    if (message.author.bot || !message.guild) return;
    let xpAdd = Math.floor(Math.random()*(20 - 10 + 1) + 10);
    let mention = message.mentions.users.first() || message.author;
        
    Exp.findOne({
        userID: message.author.id,
        serverID: message.guild.id
    },(err,res) =>{
        if(err) console.log(err);
        if(!res){
          const newDoc = new Exp({
            userID: message.author.id,
            serverID: message.guild.id,
            xp: 0,
            startxp: 0,
            level: 1
        })
        newDoc.save().catch(err => console.log(err));
        } else {
            let curxp = res.xp;  
            let curlvl = res.level;
            let nxtlvl = curlvl * 400;
          
            let xpAdd = Math.floor(Math.random()*(20 - 10 + 1) + 10);
          
            res.xp += xpAdd;
          
            if(nxtlvl <= res.xp) {
                res.level = curlvl + 1;
                res.startxp = nxtlvl;
                message.channel.send(`Chúc mừng ${message.author} vừa mới lên level **${curlvl+1}** kìa :3`);
            }
            res.save().catch(err => console.error(err));
        }
    })
    
  if(message.content.indexOf(prefix) !== 0) return;
  let sender = message.author; 
	let msg = message.content.toLowerCase();
	let cont = message.content.slice(prefix.length).trim().split(' ');
	let args = cont.slice(1);
  //options
  let ops = {
      ownerID: OID,
      active: active
  }
  
	let cmd = bot.commands.get(cont[0]);
  
	if(cmd) cmd.run(bot,message,args,ops,coin); 
});

bot.on("guildMemberAdd",member =>{
	//Send a message in chat-room channel that someone joined the discord server
	member.guild.channels.find("name","chat-room").sendMessage(`Chào mừng bạn đến server, ${member.user.username}`);
	//Then add a role when they come 
	let role = member.guild.roles.find("name","BOTS");
	member.addRole(role);
});
//Listener Event: user leaving the discord server
bot.on("guildMemberRemove",member =>{
	member.guild.channels.find("name","chat-room").sendMessage(`${member.user.username}, Tạm biệt bạn nhé...`);
});

bot.login(process.env.BOT_TOKEN);

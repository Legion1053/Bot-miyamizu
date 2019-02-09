const Discord = require('discord.js');
const prefix = '>>';
const bot = new Discord.Client();
const fs = require('fs');
const userData = JSON.parse(fs.readFileSync("Storage/userData.json"));
const db = require('quick.db');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');

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
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  bot.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  bot.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
});

loadCmds('Info');
loadCmds('Fun');
loadCmds('Actions');
loadCmds('Economy');
loadCmds('Music');
loadCmds('WereWolf');

bot.on('message',(message,guild) =>{ 
    if (message.author.bot || !message.guild) return;
    let score;
    let xpAdd = Math.floor(Math.random()*(20 - 10 + 1) + 10);
    let mention = message.mentions.users.first() || message.author;
    if (message.guild) {
    // Try to get the current user's score. 
    score = bot.getScore.get(mention.id, message.guild.id);
    
    // If the score doesn't exist (new user), initialize with defaults. 
    if (!score) {
      score = { id: `${message.guild.id}-${mention.id}`, user: mention.id, guild: message.guild.id, points: 0, level: 1 };
    }
    let curxp = score.points;
    const curLevel = score.level;
    let nxtLvl = curLevel * 400 + Math.round(Math.sqrt(score.points));
    
    score.points = curxp + xpAdd;
    if(nxtLvl <= score.points) {
      score.level = curLevel + 1;
      message.channel.send(`Chúc mừng ${message.author} vừa mới lên level **${curLevel+1}** kìa :3`);
    }
      bot.setScore.run(score);
    }
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
  
	if(cmd) cmd.run(bot,message,args,ops,score); 
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

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
//const client = require("./botsettings.json");
// Import the discord.js module
const Discord = require("discord.js");
const prefix = '>>';
const bot = new Discord.Client();
const fs = require('fs');
const mysql = require('mysql');

//Call the file userData.json by using fs
const userData = JSON.parse(fs.readFileSync("Storage/userData.json"));
//Make a collection of all the commands for the bot
bot.commands = new Discord.Collection();

//Read the directory of the commands forder
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

//Listen event: Bot ready
bot.on("ready", () =>{
	console.log(`Bot ${bot.user.username} sẵn sàng`);
	//Status
	bot.user.setStatus("Online");
	//Activity
	bot.user.setActivity(">>help để trợ giúp",{type: "PLAYING"});
});
loadCmds('Info');  
// loadCmds('Economy');
//loadCmds('Fun');
//loadCmds('Actions');
//loadCmds('Music');

var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Tyuoshn51234511',
	database: 'miyamizu'
});

db.connect(err =>{
	if(err) throw err;
	console.log('Đã kết nối vào database!');
	//db.query('SHOW TABLES',console.log);
});

var generateXP = () =>{
	return Math.floor(Math.random()*(50 - 10 + 1) + 10);
}


//Listener Event: message received (This will run every time a message is received)
bot.on("message",(message,guild) =>{
	//Variables
	let sender = message.author; 
	let msg = message.content.toLowerCase();
	let cont = message.content.slice(prefix.length).trim().split(' ');
	let args = cont.slice(1);
	
	let cmd = bot.commands.get(cont[0]);
	if(cmd) cmd.run(bot,message,args,db);

	db.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`,(err,rows)=>{
		if(err) throw err;
		let sql;

		if(rows.length < 1){
			sql = `INSERT INTO xp (id,xp) VALUES ('${message.author.id}', ${generateXP()})`;
		} else {
			let xp = rows[0].xp;
			sql = `UPDATE xp SET xp = ${xp + generateXP()} WHERE id = '${message.author.id}'`;
		}

		db.query(sql,console.log);
	});
});
//Listener Event: user joining the discord server
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

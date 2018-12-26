//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const client = require("./botsettings.json");
// Import the discord.js module
const Discord = require("discord.js");
const prefix = client.prefix;
const bot = new Discord.Client();
const fs = require('fs');
const ytdl = require('ytdl-core');
const antispam = require("discord-anti-spam");
//const profanities = require('profanities');
//Call the file userData.json by using fs
const userData = JSON.parse(fs.readFileSync("Storage/userData.json"));
//Make a collection of all the commands for the bot
bot.commands = new Discord.Collection();

antispam(bot,{
	warnBuffer: 3, 
    maxBuffer: 5, 
    interval: 3000, 
    warningMessage: "Phát hiện ra có thành viên spam", 
    //banMessage: " was banned for spamming. Don't test PuRe bots anti spam. Would anyone else like a try?", 
    maxDuplicatesWarning: 7, 
    maxDuplicatesBan: 10, 
    deleteMessagesAfterBanForPastDays: 7
});
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
// loadCmds('Info');
// loadCmds('Economy');
loadCmds('Fun');
// loadCmds('Actions');
// loadCmds('Music');
//Listener Event: message received (This will run every time a message is received)
bot.on("message",(message,guild) =>{
//Variables
	let sender = message.author; //The person who sent the message 
	let msg = message.content.toLowerCase();//Take the message, and make it all lowercase
	let cont = message.content.slice(prefix.length).trim().split(' ');
	let args = cont.slice(1);
	if(!message.content.startsWith(prefix)) return;

	let cmd = bot.commands.get(cont[0]);

	if(cmd) cmd.run(bot,message,args);
	// if(msg=== prefix+ 'reload'){
	// 	if(message.author.id !== '412952754839879680') return message.channel.send('Bạn không có quyền sử dụng câu lệnh này!');
	// 	else {
	// 		message.channel.send({embed:{description: "Tất cả câu lệnh đã được khởi động lại"}});
	// 		loadCmds();
	// 	}
	// }	
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
bot.login(client.token);
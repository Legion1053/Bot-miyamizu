//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const client = require("./botsettings.json");
// Import the discord.js module
const Discord = require("discord.js");
const prefix = client.prefix;
const bot = new Discord.Client();
const fs = require('fs');
const profanities = require('profanities');
//Call the file userData.json by using fs
const userData = JSON.parse(fs.readFileSync("Storage/userData.json"));
//Make a collection of all the commands for the bot
bot.commands = new Discord.Collection();
//Read the directory of the commands forder
let loadCmds = ()=>{
fs.readdir('./cmds/',(err,files)=>{
	if(err) console.error(err);//Send an error message if it gets an error
	//Check if the file extension is 'js' or the text after the . is 'js'
	let jsfiles = files.filter(f => f.split('.').pop()==='js');
	if(jsfiles.length <= 0) return console.log('No commands found...');
	else console.log(jsfiles.length+' commands found');

	jsfiles.forEach((f,i)=>{ //Loop though each file and run the following code
		delete require.cache[require.resolve(`./cmds/${f}`)];//This delete the cached file that you spectify
		let cmds = require(`./cmds/${f}`);// Gets every js file in the chosen folder
		console.log(`Command ${f} loading...`);
		bot.commands.set(cmds.config.command,cmds);
	});
});
}

var userInfo = user =>{
	let finalString= ' ';

	finalString += '**'+user.username+'**, with the ID of **'+user.id +'**';
	let userCreated = user.createdAt.toString().split(' ');
	finalString += ' and was created at: **' + userCreated[1] +','+userCreated[2]+' '+userCreated[3]+'**';
	return finalString;
}
//Listen event: Bot ready
bot.on("ready", () =>{
	console.log("ready");
	//Status
	bot.user.setStatus("Online");
	//Activity
	bot.user.setActivity(">>help để trợ giúp",{type: "PLAYING"});
});
loadCmds();
//Listener Event: message received (This will run every time a message is received)
bot.on("message",message =>{
//Variables
	let sender = message.author; //The person who sent the message
	let msg = message.content.toLowerCase();//Take the message, and make it all lowercase
	let cont = message.content.slice(prefix.length).split(' ');
	let args = cont.slice(1);
	if(!message.content.startsWith(prefix)) return;

	let cmd = bot.commands.get(cont[0]);

	if(cmd) cmd.run(bot,message,args);
	if(msg=== prefix+ 'reload'){
		message.channel.send({embed:{description: "All command reloaded"}});
		loadCmds();
	}
//profanity
	for(let x=0;x<profanities.length;x++){//This loop every word of the profanities list I downloaded
		if(msg === profanities[x].toLowerCase()){
			message.channel.send('Hey,pls don\'t say that!');
			message.delete();
			return;//Stop the rest of the commands from running loop
		}
	}
	if(msg === prefix + 'userstats'){
		message.channel.send('You have sent **'+userData[sender.id].messagesSent+'** messages');
	}
//If the message starts with the command since they'll adding things to the end of it
	if(msg.startsWith(prefix + 'userinfo')){
//If they only call info themselves
		if(msg === prefix + 'userinfo'){
			message.channel.send(userInfo(sender));
		}
	}
//Make sure their username is there before write the file
	if(!userData[sender.id]) userData[sender.id] = {
		messagesSent: 0
	}
//Increase messages Sent
	userData[sender.id].messagesSent++;
//Save the file
	fs.writeFile('Storage/userData.json',JSON.stringify(userData),(err) =>{
		if(err) console.error(err);// If their is a error it will log this code
	});
});
//Listener Event: user joining the discord server
bot.on("guildMemberAdd",member =>{
	//Send a message in chat-room channel that someone joined the discord server
	member.guild.channels.find("name","chat-room").sendMessage(`Welcome to the server,${member.user.username}`);
	//Then add a role when they come
	let role = member.guild.roles.find("name","BOTS");
	member.addRole(role);
});
//Listener Event: user leaving the discord server
bot.on("guildMemberRemove",member =>{
	member.guild.channels.find("name","chat-room").sendMessage(`${member.user.username},Tạm biệt bạn nhé...`);
});
bot.login(client.token);
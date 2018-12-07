module.exports.run = async(bot,message,args) =>{//This is what will run when the command is called
//Ping/Pong command
		message.channel.sendMessage(`pong! **${Math.round(bot.ping)}** ms`);
}

module.exports.config = {// This is the config for the command, you can add things to this like proper usage,...
	command: "ping"
}
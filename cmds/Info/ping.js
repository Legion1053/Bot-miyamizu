module.exports.run = async(bot,message,args) =>{
	message.channel.send(`pong! **${Math.round(bot.ping)}** ms`);
}

module.exports.config = {
	command: "ping",
 	category: "Info"
}

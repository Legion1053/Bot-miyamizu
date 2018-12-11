module.exports.run = async(bot,message,args) =>{
	message.channel.send(`Avatar của ${message.author}`);
	message.channel.send(message.author.avatarURL); 
}

module.exports.config = {
	command: "avatar"
}
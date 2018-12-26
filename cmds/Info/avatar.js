module.exports.run = async(bot,message,args) =>{
	let mention = message.mentions.users.first() || message.author;
	
	message.channel.send(mention.avatarURL);
}

module.exports.config = {
	command: "avatar"
}
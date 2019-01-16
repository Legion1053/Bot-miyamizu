module.exports.run = async(bot,message,args,db) =>{
	let mention = message.mentions.users.first() || message.author;
	
	message.channel.send(mention.avatarURL);
}

module.exports.config = {
	command: "avatar"
}

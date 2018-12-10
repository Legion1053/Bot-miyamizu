module.exports.run = async(bot,message,args) =>{
	message.channel.send(userInfo(message.author));
}

module.exports.config = {
	command: "userinfo"
}

let userInfo = user =>{
	let finalString= ' ';

	finalString += '**'+user.username+'**, with the ID of **'+user.id +'**';
	let userCreated = user.createdAt.toString().split(' ');
	finalString += ' and was created at: **' + userCreated[1] +','+userCreated[2]+' '+userCreated[3]+'**';
	return finalString;
}
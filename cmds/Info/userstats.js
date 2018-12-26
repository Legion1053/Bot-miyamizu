const fs = require('fs');
const userData = JSON.parse(fs.readFileSync("Storage/userData.json","utf8"));

module.exports.run = async(bot,message,args) =>{
	let sender= message.author;
	//Make sure their username is there before write the file
	if(!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {//To make the ID unique when they are in the diffrent server
		messagesSent: 0
	}
	//Increase messages Sent
	userData[sender.id + message.guild.id].messagesSent++;
	//Save the file
	fs.writeFile('Storage/userData.json',JSON.stringify(userData), err =>{
		if(err) console.error(err);// If their is a error it will log this code
	})
	message.channel.send('You have sent **'+userData[sender.id+message.guild.id].messagesSent+'** messages');
}
module.exports.config = {
	command: "userstats"
}

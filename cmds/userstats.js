const fs = require('fs');
const Discord = require("discord.js");
const userData = JSON.parse(fs.readFileSync("Storage/userData.json"));

module.exports.run = async(bot,message,args) =>{
	let sender= message.author;
	//Make sure their username is there before write the file
	if(!userData[sender.id]) userData[sender.id] = {//To make the ID unique when they are in the diffrent server
		messagesSent: 0
	}
	//Increase messages Sent
	userData[sender.id].messagesSent++;
	//Save the file
	fs.writeFile('Storage/userData.json',JSON.stringify(userData), err =>{
		if(err) console.error(err);// If their is a error it will log this code
	})
	message.channel.send('You have sent **'+userData[sender.id].messagesSent+'** messages');
}
module.exports.config = {
	command: "userstats"
}

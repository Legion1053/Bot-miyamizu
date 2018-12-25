const fs= require('fs');
const userData = JSON.parse(fs.readFileSync("Storage/userData.json","utf8"));
module.exports.run = async(bot,message,args)=>{
	let sender= message.author;
	//if(!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {};
	if(!userData[sender.id + message.guild.id].money) userData[sender.id + message.guild.id].money = 1000;
	fs.writeFile("Storage/userData.json",JSON.stringify(userData), err =>{
		if(err) console.error(err)
	})
	message.channel.send(`Bạn có ${userData[sender.id+message.guild.id].money}$ trong tài khoản`);
}

module.exports.config = {
	command: "balance"
}
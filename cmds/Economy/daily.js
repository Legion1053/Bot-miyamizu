const fs = require('fs');
const userData = JSON.parse(fs.readFileSync("Storage/userData.json","utf8"));
const moment = require('moment');
module.exports.run = async(bot,message,args)=>{
	let sender = message.author;
	if(userData[sender.id+message.guild.id].lastDaily != moment().format('L')){
		userData[sender.id+message.guild.id].lastDaily = moment().format('L');
		userData[sender.id+message.guild.id].money += 500;
		message.channel.send("Bạn đã nhận được 500$ từ tiền thưởng mỗi ngày");
	}
	else message.channel.send("Bạn chỉ có thể nhận được tiền thưởng trong: "+moment().endOf('day').fromNow());
}
module.exports.config = {
	command: "daily"
}
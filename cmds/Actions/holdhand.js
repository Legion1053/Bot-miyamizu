const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{ 
	let {body} = await superagent
    	.get(`https://api.tenor.com/v1/random?q=anime+hold+hands&key=10LA8OYRLBFU&limit=1`);
    let mention = message.mentions.users.first();
    if (!mention) return message.channel.send(`Bạn phải chọn người để nắm tay đã :3`).then(msg => {
    	msg.delete(3000)
  	});
    else if(args[0] === '<@514823687560757268>') message.channel.send(`XD \n ${body.results[0].media[0].gif.url}`);	
    else message.channel.send(`**${message.author.username}** vừa nắm tay **${mention.username}** kìa :heart: ${body.results[0].media[0].gif.url}`);
}

module.exports.config ={
	command: 'holdhand'
}
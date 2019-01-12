const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{ 
	let {body} = await superagent
    	.get(`https://api.tenor.com/v1/random?q=anime+dance&key=${process.env.TENOR_API}&limit=1`);
    let mention = message.mentions.users.first();
    if(args[0] === '<@514823687560757268>') message.channel.send(`Nhảy nào XD ${body.results[0].media[0].gif.url}`);	
    message.channel.send(`**${message.author.username}** đang nhảy kìa XD ${body.results[0].media[0].gif.url}`);
}

module.exports.config ={
	command: 'dance'
}

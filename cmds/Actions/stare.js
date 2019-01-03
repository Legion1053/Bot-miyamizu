const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{ 
	let {body} = await superagent
    	.get(`https://api.tenor.com/v1/random?q=anime+stare&key=10LA8OYRLBFU&limit=1`);
    let mention = message.mentions.users.first();
    if (!mention) return message.channel.send(`Bạn phải chọn người để lườm đã :grimacing:`).then(msg => {
    	msg.delete(3000)
  	});
    else if(args[0] === '<@514823687560757268>') message.channel.send(`**:((** ${body.results[0].media[0].gif.url}`);	
    else message.channel.send(`**${message.author.username}** vừa lườm **${mention.username}** kìa :cold_sweat: ${body.results[0].media[0].gif.url}`);
}

module.exports.config ={
	command: 'stare'
}
const superagent = require("superagent");

module.exports.run = async(bot,message,args) =>{ 
	let {body} = await superagent
    	.get(`https://api.tenor.com/v1/random?q=anime+shrug&key=10LA8OYRLBFU&limit=1`);
    
    message.channel.send(`¯\\_\(ツ)\_\/¯ ${body.results[0].media[0].gif.url}`);
}

module.exports.config ={
	command: 'idk'
}
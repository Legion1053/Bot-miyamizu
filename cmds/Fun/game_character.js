const mal = require('mal-scraper');
const Discord = require('discord.js');

module.exports.run = async(bot,message,args) =>{
	let num = Math.floor((Math.random()*400)+1);
	let url = `https://myanimelist.net/character/${num}`;
	mal.getInfoFromURL(url)
  		.then((data) => console.log(data.character.name))
  		.catch((err) => message.channel.send(err)) 
 	console.log(url);
}

module.exports.config = {
	command: 'random'
}
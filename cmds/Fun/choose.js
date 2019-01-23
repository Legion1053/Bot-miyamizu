module.exports.run= async(bot,message,args)=>{
	 let choose= args.toString().split(' ');
	 let reply= Math.floor(Math.random()*(args.length)); 
	 message.channel.send(`Tui chọn ${args[reply]} :grin:`);
}

module.exports.config ={
	command: "choose",
  	category: "Fun"
}

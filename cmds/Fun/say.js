module.exports.run = async(bot,message,args) => {
	const say = args.slice().join(" ");
	message.guild.members.get('514823687560757268').setNickname(message.author.username);
	message.channel.send(say);
	message.delete(3000).catch();
	message.guild.members.get('514823687560757268').setNickname('Miyamizu');
}

module.exports.config ={
	command: 'say',
  	category: 'Fun',
  	description: "Dùng để nói ",
  	usage: ">>say [đoạn cần nói]"
}

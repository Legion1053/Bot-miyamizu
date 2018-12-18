module.exports.run = async(bot,message,args)=>{
	if(!message.member.voiceChannel) return message.channel.send('Bạn phải vào voice channel trước đã!');
	if(!message.guild.me.voiceChannel) return message.channel.send('Bot hiện tại đang không ở trong channel');
	message.member.voiceChannel.leave();
	message.channel.send("Đã rời khỏi voice Channel");	
}
module.exports.config = {
	command: "leave"
}
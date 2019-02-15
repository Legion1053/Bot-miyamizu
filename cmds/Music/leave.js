module.exports.run = async(bot,message,args,ops) =>{
  if(!message.member.voiceChannel) return message.channel.send('Bạn phải vào voice channel trước đã!');
	if(!message.guild.me.voiceChannel) return message.channel.send('Bot hiện tại không ở trong voice channel');
	if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('Bạn đang không ở chung phòng với bot!');

	message.guild.me.voiceChannel.leave();
	message.channel.send("Đã rời khỏi voice Channel");	
}

module.exports.config = {
   command: 'leave',
   category: 'Music',
   description: "Dùng để yêu cầu bot ra khỏi voice channel",
   usage: ">>leave"
}

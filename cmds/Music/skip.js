module.exports.run = async(bot,message,args,ops)=>{
  let fetched = ops.active.get(message.guild.id);
	
  if(!fetched) return message.channel.send('Bot hiện tại đang không ở trong channel');
  if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Bạn hiện không ở voice channel!');
  fetched.connection.dispatcher.end('Đã chuyển qua bài hát khác!');
  return undefined;
}
module.exports.config = {
	command: "skip",
  category: 'Music',
  description: "Dùng để bỏ qua bài hát đang phát",
  usage: ">>skip"
}

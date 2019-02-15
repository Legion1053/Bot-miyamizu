const ytdl = require('ytdl-core');

module.exports.run = async(bot,message,args,ops) =>{ 
    let fetched = ops.active.get(message.guild.id);
    
    if(!message.member.voiceChannel) return message.channel.send('Bạn phải vào voice channel đã!');
    if (!fetched) return message.channel.send('Hiện tại trong phòng bot không phát nhạc!');
    if (!args[0]) return message.channel.send(`Âm lượng hiện tại là: ${fetched.volume}/5`);
    
    fetched.volume = args[0];
    fetched.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
  
    let volval;
            if (fetched.volume == 1) {
                volval = `○──── :loud_sound:⠀`
            }
            if (fetched.volume == 2) {
                volval = `─○─── :loud_sound:⠀`
            }
            if (fetched.volume == 3) {
                volval = `──○── :loud_sound:⠀`
            }
            if (fetched.volume == 4) {
                volval = `───○─ :loud_sound:⠀`
            }
            if (fetched.volume == 5) {
                volval = `────○ :loud_sound:⠀`
            }
    message.channel.send(volval)
}

module.exports.config = {
    command: 'volume',
    category: 'Music',
    description: "Dùng để thay đổi âm lượng hoặc xem âm lượng hiện tại",
    usage: ">>volume [âm lượng từ 1-5]"
}

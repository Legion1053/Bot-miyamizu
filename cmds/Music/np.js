const ytdl = require('ytdl-core');
const queue = new Map();

module.exports.run = async(bot,message,args,ops) =>{
    const fetched = ops.active.get(message.guild.id);
    if (!fetched) return message.channel.send('Hiện tại trong phòng bot không phát nhạc!');
    return message.channel.send(`🎶 Đang phát nhạc: **${fetched.songs[0].title}**`);
}

module.exports.config = {
    command: 'np',
    category: 'Music',
    description: "Dùng để bài hát đang phát trên voice Channel",
    usage: ">>np"
}

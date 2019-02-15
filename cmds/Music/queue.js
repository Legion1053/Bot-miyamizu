module.exports.run = async(bot,message,args,ops) =>{
    const fetched = ops.active.get(message.guild.id);
    let index = 0;
    if(!message.member.voiceChannel) return message.channel.send('Bạn phải vào voice channel đã!');
    if (!fetched) return message.channel.send('Hiện tại trong phòng bot không phát nhạc!');
  
    return message.channel.send(`
**Danh sách các bài hát đã chọn:**
${fetched.songs.map(song => `**${++index}**. ${song.title}`).join('\n')}
`);
}

module.exports.config = {
    command: 'queue',
    category: 'Music',
    description: "Dùng để kiểm tra danh sách bài hát đang phát",
    usage: ">>ping"
}

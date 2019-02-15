module.exports.run = async(bot,message,args,ops) =>{
   const fetched = ops.active.get(message.guild.id);
   if (fetched && fetched.playing) {
        fetched.playing = false;
        fetched.connection.dispatcher.pause();
        return message.channel.send('⏸ Đã dừng bài hát');
    }
}

module.exports.config = {
    command: 'pause',
    category: 'Music',
    description: "Dùng để dừng bài hát",
    usage: ">>pause"
}

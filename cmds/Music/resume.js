module.exports.run = async(bot,message,args,ops) =>{
   const fetched = ops.active.get(message.guild.id);
   if (fetched && !fetched.playing) {
        fetched.playing = true;
        fetched.connection.dispatcher.resume();
        return message.channel.send('⏸ Tiếp tục chạy bài hát!!');
    }
}

module.exports.config = {
    command: 'resume',
    category: 'Music',
    description: "Dùng để tiếp tục bài hát",
    usage: ">>resume"
}

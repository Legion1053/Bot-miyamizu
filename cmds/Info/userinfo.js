const Discord= require("discord.js" );
const moment = require("moment")

module.exports.run = async(bot,message,args) =>{
  let mention = message.mentions.members.first() || message.member;
  let member = message.mentions.users.first() || message.author;
  let embed = new Discord.RichEmbed()
    .setColor("#3399ff")
    .setThumbnail(member.avatarURL)
    .addField("User name: ",mention.user.tag)
    .addField("Nick name: ",`${mention.nickname !== null ? `${member.nickname}` : 'Chưa có'}`)
    .addField("ID",mention.id)
    .addField("Tình trạng: ",`${mention.presence.status}`)
    .addField("Playing: ",`${mention.presence.game ? `:video_game: ${mention.user.presence.game.name}`: "Not playing"}`)
    .addField("Tạo tài khoản lúc: ",`${moment.utc(mention.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
    .addField("Vào server lúc: ",`${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
  message.channel.sendEmbed(embed);
}

module.exports.config = {
  command: "userinfo",
  category: "Info"
}

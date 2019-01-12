const Discord = require('discord.js');
const osu = require('node-osu');
const api = new osu.Api(process.env.OSU_API,{
	notFoundAsError: true,
    completeScores: false 
})

module.exports.run = async(bot,message,args) =>{
	let username = args[0];

	if(!args[0]) return message.channel.send('Bạn phải nhập tên người chơi đã :3').then(msg =>{
		msg.delete(3000);
	})

	api.getUser({u: username}).then(user =>{
		let flag = String(user.country).toLowerCase();
		const OsuEmbed = new Discord.RichEmbed()
			.setTitle('Tìm kiếm thông tin người chơi')
			.setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
			.setColor("#f442ce")
			.addField(':large_blue_diamond: Nickname: ',user.name,true)
			.addField(':large_blue_diamond: PP: ',Math.round(user.pp.raw),true)
			.addField(':large_blue_diamond: Rank: ',user.pp.rank,true)
			.addField(':large_blue_diamond: Level: ',Math.round(user.level),true) 
			.addField(`:large_blue_diamond: Quốc gia: `,`:flag_${flag}:`,true)
			.addField(`:large_blue_diamond: Rank :flag_${flag}: :`, `${user.pp.countryRank}`,true)
			.addField(':large_blue_diamond: Số lần chơi: ',user.counts.plays,true)
			.addField(':large_blue_diamond: Độ chính xác: ',user.accuracyFormatted,true)
		message.channel.send(OsuEmbed);
	})
}

module.exports.config ={
	command: 'osu'
}

const Discord = require("discord.js");
const anime = require("mal-scraper");

module.exports.run = async(bot,message,args) =>{
	const search = args.slice().join(" ");
	anime.getInfoFromName(search)
		.then(data =>{
			const malEmbed = new Discord.RichEmbed()
				.setAuthor(manga.titles.english)
				.setColor('#ab4cf9')
				.setThumbnail(data.picture)
				.setDescription(data.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
				.addField(':flag_jp: Tiêu đề tiếng Nhật: ',data.japaneseTitle,true)
				.addField(':watch: Tình trạng: ',data.status)
				.addField(':page_with_curl: Thể loại: ',data.type,true)
				.addField(':dvd: Số tập: ',data.episodes,true)
				.addField(':arrow_up: Độ tuổi: ',data.rating,true)
				.addField(':calendar_spiral: Ngày ra mắt: ',data.aired,true)
				.addField(':star: Số điểm đánh giá: ',data.score,true)
				.addField(':trophy: Xếp hạng: ',data.ranked,true)
			message.channel.send(malEmbed);
		})
		.catch((err)=> {
			console.log(err);
			message.channel.send("Không tìm thấy anime cần tìm! "); 
		});
}

module.exports.config ={
	command: "anime"
}
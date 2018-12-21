const Discord = require("discord.js");
const anime = require("mal-scraper");

module.exports.run = async(bot,message,args) =>{
	const search = args.toString();
	anime.getInfoFromName(search)
		.then(data =>{
			const malEmbed = new Discord.RichEmbed()
				.setThumbnail(data.picture)
				.setFooter(`Link ${data.url}`)
				.addField(data.title)
				.addField(':watch: Tình trạng: ',data.status,true)
				.addField(':flag_us: Tiêu đề tiếng Anh: ',data.englishTitle,true)
				.addField(':flag_jp: Tiêu đề tiếng Nhật: ',data.japaneseTitle,true)
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
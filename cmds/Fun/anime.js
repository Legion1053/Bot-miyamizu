const Discord = require('discord.js');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

module.exports.run = async(bot,message,args) =>{
	const search = args.slice().join(" ");
	if(!search) return message.channel.send('Bạn phải nhập tên anime đã :v');

	kitsu.searchAnime(search)
		.then(result =>{
			if(result.length === 0) { 
				return message.channel.send('Không tìm thấy anime cần tìm!');
			}
			let anime = result[0];

			const embed = new Discord.RichEmbed()
				.setAuthor(anime.titles.romaji)
				.setColor('#4d8ff9')
				.setThumbnail(anime.posterImage.original)
				.setDescription(`${anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0]}`)
				.addField(':flag_jp: Tiêu đề tiếng Nhật: ',anime.titles.japanese,true)
				.addField(':page_with_curl: Thể loại: ',anime.showType,true)
				.addField(':watch: Tình trạng: ',`từ **${anime.startDate}** đến **${anime.endDate ? anime.endDate : 'Đang hoàn thành'}**`,true)
				.addField(':dvd: Số tập: ',`**${anime.episodeCount ? anime.episodeCount : 'N/A'}**`,true)
				.addField(':arrow_up: Độ tuổi: ',`**${anime.ageRating ? anime.ageRating : 'N/A'}**`,true)
				.addField(':star: Số điểm đánh giá: ',`**${anime.averageRating ? anime.averageRating : 'N/A'}/100**`,true)
				.addField(':trophy: Xếp hạng: ',`**TOP ${anime.ratingRank ? anime.ratingRank : 'N/A'}**`,true)
			message.channel.send(embed);
		})
		.catch((err)=> {
			console.error(err);
			message.channel.send('Không tìm thấy anime cần tìm! '); 
		});
}

module.exports.config = {
	command : 'anime',
 	category: 'Fun',
  	description: "Dùng để lấy thông tin anime cần tìm",
  	usage: ">>anime [tên anime]"
}

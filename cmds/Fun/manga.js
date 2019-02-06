const Discord = require('discord.js');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

module.exports.run = async(bot,message,args) =>{
	const search = args.slice().join(" ");
	if(!search) return message.channel.send('Bạn phải nhập tên anime đã :v');

	kitsu.searchManga(search)
		.then(result =>{
			if(result.length === 0) { 
				return message.channel.send('Không tìm thấy anime cần tìm!');
			}
			let manga = result[0];

			const Membed = new Discord.RichEmbed()
				.setAuthor(manga.titles.english)
				.setThumbnail(manga.posterImage.original)
				.setDescription(`${manga.synopsis.replace(/<[^>]*>/g, '').split('\n')[0]}`)
				.addField(':flag_jp: Tiêu đề tiếng Nhật: ',manga.titles.japanese,true)
				.addField(':page_with_curl: Thể loại: ',manga.mangaType,true)
				.addField(':watch: Tình trạng: ',`từ **${manga.startDate}** đến **${manga.endDate ? manga.endDate : 'Đang hoàn thành'}**`,true)
				.addField(':newspaper: Số chapter: ',`**${manga.chapterCount ? manga.chapterCount : 'N/A'}**`,true)
				.addField(':books: Số tập: ',`**${manga.volumeCount}**`,true)
				.addField(':arrow_up: Độ tuổi: ',`**${manga.ageRating ? manga.ageRating : 'N/A'}**`,true)
				.addField(':star: Số điểm đánh giá: ',`**${manga.averageRating ? manga.averageRating : 'N/A'}/100**`,true)
				.addField(':trophy: Xếp hạng: ',`**TOP ${manga.ratingRank ? manga.ratingRank : 'N/A'}**`,true)
			message.channel.send(Membed);
		})
		.catch((err)=> {
			console.error(err);
			message.channel.send('Không tìm thấy anime cần tìm! '); 
		});
}

module.exports.config = {
	command : 'manga',
  	category: 'Fun',
  	description: "Dùng để lấy thông tin manga cần tìm",
  	usage: ">>manga [tên manga]"
}

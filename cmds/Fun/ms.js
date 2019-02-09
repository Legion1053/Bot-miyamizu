const Discord = require('discord.js');
const { Collection } = require('discord.js');
const { stripIndents } = require('common-tags');
const {questions,description,img} = require('../../util/json/roles.json');
const reaction_numbers = [":zero:",":one:",":two:",":three:",":four:",":five:", ":six:",":seven:",":eight:",":nine:",":keycap_ten:"];
this.playing = new Set();

module.exports.run = async(bot,message,args) =>{
   if(args[0] === 'start'){
       	if (this.playing.has(message.channel.id)) return message.reply('Câu lệnh đã được sử dụng!');
    this.playing.add(message.channel.id);
    let turn = 0;
    try {
    await message.channel.send('Cần ít nhất 3 nguời để có thể chơi được trò này. Nhấn ``join`` để tham gia trò chơi');
    const awaitedPlayers = await awaitPlayers(message, 10, 2, { dmCheck: true });
    if (!awaitedPlayers) {
				this.playing.delete(message.channel.id);
				return message.channel.send('Trò chơi đã bị hủy...');
		}
    const players = await generatePlayers(awaitedPlayers);
    while (players.size > 1 && players.some(p => p.role === 'mafia')) {
        let killed = null;
				let saved = null;
        let night = new Discord.RichEmbed() 
            .setImage('https://s3.amazonaws.com/files.enjin.com/1421003/modules/forum/attachments/unnamed_1501033128.jpg')
        await message.channel.send(`Đêm thứ ${++turn} bắt đầu!`,{embed:night});
        for (const player of players.values()) {
            if (player.role.includes('pleb')) continue;
            await message.channel.send(`Phe ${player.role} đang lựa chọn...`);
            const valid = Array.from(players.filter(p => p.role !== player.role).values());
            await player.user.send(stripIndents`
						${questions[player.role]} Bạn hãy lựa chọn.
						${valid.map((p, i) => `**${i + 1}.** ${p.user.tag}`).join('\n')}
					  `);
            const filter = res => valid[Number.parseInt(res.content, 10) - 1];
					  const decision = await player.user.dmChannel.awaitMessages(filter, {
						max: 1,
						time: 12000
					});
          if (!decision.size) {
						await player.user.send('Thời gian đã hết!');
						continue;
					}
          const choice = valid[Number.parseInt(decision.first().content, 10) - 1].id;
					if (player.role === 'mafia') {
						const chosen = players.get(choice);
						killed = chosen.id;
						await player.user.send(`${chosen.user.tag} will be killed...`);
					} else if (player.role === 'doctor') {
						const chosen = players.get(choice);
						saved = chosen.id;
						await player.user.send(`${chosen.user.tag} will be saved...`);
					} else if (player.role === 'detective') {
						await player.user.send(players.find(p => p.role === 'mafia').id === choice ? 'Yes.' : 'No.');
					}
        }
        const display = killed ? players.get(killed).user : null;
				//const story = stories[Math.floor(Math.random() * stories.length)];
				if (killed && killed === saved) {
					await message.channel.send(stripIndents`
						Đêm qua, phe sói đã cố gắng giết ${display}
						May mắn thay, người đó đã được doctor cứu sống
						Dân làng có một phút để thảo luận xem ai là sói
					`);
        } else if (killed && players.size < 3) {
					await message.channel.send(stripIndents`
						Đêm qua phe sói đã giết ${display}
            Sau vụ đó, người dân vì quá sợ hãi đã chuyển sang nơi khác sống
					`);
					break;
				} else if (killed && killed !== saved) {
					players.delete(killed);
					await message.channel.send(stripIndents`
					Đêm qua, phe sói đã giết ${display}
					Dân làng có một phút để thảo luận xem ai là sói
					`)
				} else {
					await message.channel.send(stripIndents`
						Đêm qua, phe sói đã không giết bất cứ trong làng.
						Dân làng có một phút để thảo luận xem ai là sói
					`)
				} 
        await delay(10000);
				const playersArr = Array.from(players.values());
        const poll = new Discord.RichEmbed()
            .setTitle('Bỏ phiếu')
            .setDescription('Nếu bạn nghi ai là sói, hãy chọn các số sau để bỏ phiếu treo người đó!');
            playersArr.map((p, i) => poll.addField(`${i + 1}. ${p.user.tag}`,'---------'));
        
        await message.channel.send({embed: poll});
        
        const voted = [];
        const filter = res => {
					if (!players.some(p => p.user.id === res.author.id)) return false;
					if (voted.includes(res.author.id)) return false;
					if (!playersArr[Number.parseInt(res.content, 10) - 1]) return false;
					voted.push(res.author.id);
					return true;
				}
        const votes = await message.channel.awaitMessages(filter, {
					max: players.size,
					time: 12000
				})
        if (!votes.size) {
					await message.channel.send('Kết quả: Chưa có ai bị treo.');
					continue;
				}
        const hanged = getHanged(votes, players, playersArr);
				await message.channel.send(`${hanged.user} đã bị treo cổ (${hanged.votes}/${players.size})`);
				players.delete(hanged.id);
				turn++ ;
      }
      this.playing.delete(message.channel.id);
			const mafia = players.find(p => p.role === 'mafia');
			if (!mafia) return message.channel.send('Phe dân thắng!');
			return message.channel.send(`Phe sói thắng`);
    } catch(e) {
      console.error(e);
      this.playing.delete(message.channel.id);
			return message.reply(`Có lỗi xảy ra.`);
    }
  }
}
async function generatePlayers(list){
		let roles = ["mafia", "doctor"];
		for (let i = 0; i < (list.length - 2); i++) roles.push(`pleb ${i + 1}`);
		roles = shuffle(roles);
		const players = new Collection();
		let i = 0;
		for (const user of list) {
			players.set(user.id, {
				id: user.id,
				user,
				role: roles[i]
			});
      let embed = new Discord.RichEmbed()
          .setTitle(`Role`)
          .setDescription(description[i])
          .setImage(img.roles[0])
          .addField(`Role`,roles[i])
			await user.send(embed);
      console.log(roles[0]);
		}
		return players;
}

async function awaitPlayers(message, max, min, { time = 30000, dmCheck = false } = {}) {
		const joined = [];
		joined.push(message.author.id);
		const filter = res => {
			if (res.author.bot) return false;
			if (joined.includes(res.author.id)) return false;
			if (res.content.toLowerCase() !== 'join') return false;
			joined.push(res.author.id);
			res.react('✅').catch(() => null);
      message.channel.send(`Đã thêm ${res.author.tag} vào danh sách chơi!`);
			return true;
		};
		const verify = await message.channel.awaitMessages(filter, { max, time });
		verify.set(message.id, message);
		if (dmCheck) {
			for (const message of verify.values()) {
				try {
					await message.author.send('Check dm!');
				} catch (err) {
					verify.delete(message.id);
				}
			}
		}
		if (verify.size < min) return false;
		return verify.map(message => message.author);
} 

function getHanged(votes, players, playersArr) {
		const counts = new Collection();
		for (const vote of votes.values()) {
			const player = players.get(playersArr[Number.parseInt(vote.content, 10) - 1].id);
			if (counts.has(player.id)) {
				++counts.get(player.id).votes;
			} else {
				counts.set(player.id, {
					id: player.id,
					votes: 1,
					user: player.user
				});
			}
		}
		return counts.sort((a, b) => b.votes - a.votes).first();
}

function delay(ms){
		return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffle(array) {
		const arr = array.slice(0);
		for (let i = arr.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
}

module.exports.config ={
   command: 'ms' 
}

const Discord = require('discord.js');
const {stripIndents} = require('common-tags');
this.playing = new Set();
const yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'ya','có'];
const no = ['no', 'n', 'nah', 'nope', 'nop','không'];

module.exports.run = async(bot,message,args) =>{
  if(!args[0]) return message.channel.send('Bạn phải nhập tên người chơi cùng đã!');
  let mention = message.mentions.users.first();
	if(mention.bot) return message.channel.send('Bot không thể chơi được trò này!');
	if(mention.id === message.author.id) return message.channel.send('Bạn không thể chơi với chính mình được!');
	if(this.playing.has(message.channel.id)) return message.channel.send('Trò chơi hiện đang được sử dụng ở phòng này rồi!');
	this.playing.add(message.channel.id);
	try {
		await message.channel.send(`${mention}, bạn có chấp nhận lời mời chơi tictactoe của ${message.author.username} không? (30 giây để trả lời)
Nhấn có hoặc không để quyết định
`);
		const verification = await verify(message.channel, mention);
		if (!verification) {
				this.playing.delete(message.channel.id);
				return message.channel.send(`Hmm, có vẻ như ${mention.username} đã từ chối lời mời của bạn...`);
		}
		const sides = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
		const taken = [];
		let userTurn = true;
		let winner = null;
		while (!winner && taken.length < 9) {
				const user = userTurn ? message.author : mention;
				const sign = userTurn ? 'X' : 'O';
				await message.channel.send(stripIndents`
					${user}, Bạn chọn bên nào?
					\`\`\`
					${sides[0]} | ${sides[1]} | ${sides[2]}
					—————————
					${sides[3]} | ${sides[4]} | ${sides[5]}
					—————————
					${sides[6]} | ${sides[7]} | ${sides[8]}
					\`\`\`
				`);
				const filter = res => {
					const choice = res.content;
					return res.author.id === user.id && sides.includes(choice) && !taken.includes(choice);
				};
				const turn = await message.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
				if (!turn.size) {
					await message.channel.send('Thời gian của bạn đã hết!');
					userTurn = !userTurn;
					continue;
				}
				const choice = turn.first().content;
				sides[Number.parseInt(choice, 10)] = sign;
				taken.push(choice);
				if (verifyWin(sides)) winner = userTurn ? message.author : mention;
				userTurn = !userTurn;
			} 
			this.playing.delete(message.channel.id);
			return message.channel.send(winner ? `Chúc mừng, ${winner} đã dành chiến thắng!` : 'Hòa...');
	} catch(e) {
		this.playing.delete(message.channel.id);
		console.log(e);
	}
}
function verifyWin(sides){
		return (sides[0] === sides[1] && sides[0] === sides[2])
			|| (sides[0] === sides[3] && sides[0] === sides[6])
			|| (sides[3] === sides[4] && sides[3] === sides[5])
			|| (sides[1] === sides[4] && sides[1] === sides[7])
			|| (sides[6] === sides[7] && sides[6] === sides[8])
			|| (sides[2] === sides[5] && sides[2] === sides[8])
			|| (sides[0] === sides[4] && sides[0] === sides[8])
			|| (sides[2] === sides[4] && sides[2] === sides[6]);
}
async function verify(channel, user, time = 30000) {
		const filter = res => {
			const value = res.content.toLowerCase();
			return res.author.id === user.id && (yes.includes(value) || no.includes(value));
		};
		const verify = await channel.awaitMessages(filter, {
			max: 1,
			time
		});
		if (!verify.size) return 0;
		const choice = verify.first().content.toLowerCase();
		if (yes.includes(choice)) return true;
		if (no.includes(choice)) return false;
		return false;
	}
module.exports.config = {
  command: 'tictactoe',
  description: 'Trò chơi tictactoe',
  usage: '>>tictactoe [tên người chơi cùng]'
}

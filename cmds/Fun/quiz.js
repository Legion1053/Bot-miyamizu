const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const superagent = require("superagent");
const types = ['multiple', 'boolean'];
const difficulties = ['easy', 'medium', 'hard'];
const choices = ['A', 'B', 'C', 'D'];

var shuffle = (array)=> {
		const arr = array.slice(0);
		for (let i = arr.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
}

var list = (arr, conj = 'and')=> {
		const len = arr.length;
		return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
}

module.exports.run = async(bot,message,args) =>{
    let type = args[0];
    let difficulty = args[1];
  
    try {
        const { body } = await superagent
            .get('https://opentdb.com/api.php')
            .query({
					      amount: 1,
					      type,
					      encode: 'url3986',
					      difficulty
				    });
        if (!body.results) return message.channel.send('Có lỗi xảy ra!');
        const answers = body.results[0].incorrect_answers.map(answer => decodeURIComponent(answer.toLowerCase()));
			  const correct = decodeURIComponent(body.results[0].correct_answer.toLowerCase());
        answers.push(correct);
			  const shuffled = shuffle(answers);
        await message.channel.send(stripIndents`
				**Câu hỏi**: ${decodeURIComponent(body.results[0].question)}
				${shuffled.map((answer, i) => `**${choices[i]}**. ${answer}`).join('\n')}
        (Bạn có 15 giây để trả lời câu hỏi)
			  `);
      
        const filter = res => res.author.id === message.author.id && choices.includes(res.content.toUpperCase());
			  const messages = await message.channel.awaitMessages(filter, {
				  max: 1,
				  time: 15000
			   });
        if (!messages.size) return message.channel.send(`Thời gian đã kết thúc, kết quả đúng là ${correct}.`);
			  const win = shuffled[choices.indexOf(messages.first().content.toUpperCase())] === correct;
        if(message.content.toLowerCase()=='end') return message.channel.send('Đã kết thúc trò chơi!');
        if (!win) return message.channel.send(`Sai, kết quả đúng là ${correct}.`);
			  return message.channel.send('Bạn đã trả lời đúng!');
    } catch(err) {
        console.log(err);
        return message.channel.send('Có lỗi xảy ra!');
    }
}

module.exports.config = {
    command: 'quiz',
    category: 'Fun',
    description: 'Trò chơi trắc nghiệm đố vui :3',
    usage: `>>quiz [kiểu] [độ khó]
    (Trong đó kiểu chơi bao gồm: multiple, boolean và độ khó: easy,medium,hard)`
}

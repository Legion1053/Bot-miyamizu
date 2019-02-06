const Discord = require('discord.js');
const words = require('../../util/json/words.json');

var usage = `Bạn đã nhập cú pháp sai. Cú pháp đúng là >>hangman [tên channel] [từ cần đoán]`;
var letters = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"];
var unicode = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var topics = ["", "Countries", "Capital Cities", "Food", "Movies", "Bands","Animals", "Computers", "Compound Words"];
const reaction_numbers = [":zero:",":one:",":two:",":three:",":four:",":five:", ":six:",":seven:",":eight:",":nine:",":keycap_ten:"];

var games = [];
var stages = [`\`\`\`
/---|
|   
|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|   |
| 
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|\\
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|\\
|  /
|
\`\`\`
`, `\`\`\`
/---|
|   o ~Game over
|  /|\\
|  / \\
|
\`\`\`
`];

module.exports.run = async(bot,message,args) =>{
    bot.on('messageReactionAdd', (reaction, user) => {
	  var msg = reaction.message;
	  if(!user.bot) {
		for(let i = 0; i < games.length; i++) {
			var game = games[i];
			if((msg.id == game.msg0.id || msg.id == game.msg1.id) && game.stage < stages.length) {
				var letter = unicode[letters.indexOf(reaction.emoji.name)];
				
				reaction.fetchUsers().then(usrs => {
					var reactors = usrs.array();
					var remove_next = function(index) {
						if(index < reactors.length)
							reaction.remove(reactors[index]).then(() => remove_next(index + 1));
					};
					
					remove_next(0);
				});
				
				if(game.guesses.indexOf(letter) == -1) {
					game.guesses.push(letter);
					if(game.phrase.indexOf(letter) == -1) {
						game.stage ++;
						game.msg0.edit(stages[game.stage]);
					} else {
						var sik = true;
						for(let j = 0; j < game.phrase.length; j++) {
							var c = game.phrase[j];
							if(c != ' ' && game.guesses.indexOf(c) == -1) {
								sik = false;
							}
						}
						
						if(sik) {
							message.reply('Chúc mừng, bạn đã thắng!');
						}
						
						game.msg1.edit(generateMessage(game.phrase, game.guesses));
					}
				}
			} 
			games[i] = game;
		}
	}
});
        const hman = new Discord.RichEmbed()
            .setTitle("Chọn các chủ đề sau")
            .setDescription("Bạn hãy chọn các số từ 1 đến 8")
            .setThumbnail("https://cdn3.iconfinder.com/data/icons/brain-games/128/Hangman-Game.png")
            .addField(reaction_numbers[1]+" "+topics[1], "-----------")
            .addField(reaction_numbers[2]+" "+topics[2], "-----------")
            .addField(reaction_numbers[3]+" "+topics[3], "-----------")
            .addField(reaction_numbers[4]+" "+topics[4], "-----------")
            .addField(reaction_numbers[5]+" "+topics[5], "-----------")
            .addField(reaction_numbers[6]+" "+topics[6], "-----------")
            .addField(reaction_numbers[7]+" "+topics[7], "-----------")
            .addField(reaction_numbers[8]+" "+topics[8], "-----------")
        message.channel.send(hman).then(msg => {
                  msg.delete(21000)
        });
        try {
                var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 9, {
                    maxMatches: 1,
                    time: 20000,
                    errors: ['time']
                });
              } catch (err) {
                    console.error(err);
                    return message.channel.send('Bạn đã không nhập kết quả, hủy lựa chọn!');
        } 
        let pWord;
        const num = parseInt(response.first().content);
        if(num === 1){
              pWord = getPlayWord(words.country, words.numCountry);
              console.log(pWord);
        } else if(num === 2){
              pWord = getPlayWord(words.capitalcity, words.numCities);
              console.log(pWord);
        } else if(num === 3){
              pWord = getPlayWord(words.food, words.numFoods);
              console.log(pWord);
        } else if(num === 4){
              pWord = getPlayWord(words.movie, words.numMovies);
              console.log(pWord);
        } else if(num === 5){
              pWord = getPlayWord(words.band, words.numBands);
              console.log(pWord);
        } else if(num === 6){
              pWord = getPlayWord(words.animal, words.numAnimals);
              console.log(pWord);
        } else if(num === 7){
              pWord = getPlayWord(words.computer, words.numComputers);
              console.log(pWord);
        } else if(num === 8){
              pWord = getPlayWord(words.compoundWord, words.numCompoundWords);
              console.log(pWord);
        }
        
        var word = pWord.toLowerCase();
            
        message.channel.send(stages[0]).then(m => {
        nextLetter(m, 0, word);
      });
}
  
module.exports.config = {
    command: 'hangman',
    description: `Trò chơi người treo cổ
Luật chơi: Bao gồm 2 người
Người thứ nhất sẽ viết một từ mà người thứ hai cần đoán và phải theo cú pháp
Người thứ hai sẽ lần lượt đoán các chữ cái mà họ cho là có mặt trong từ`,
    usage: `>>hangman [tên channel] [từ cần đoán]`}

var getPlayWord = (topic, numWords) => {
    var randomNum = Math.floor(Math.random() * numWords);
    return topic[randomNum];
}

var generateMessage = (phrase, guesses)=> {
	var s = "";
	for(let i = 0; i < phrase.length; i++) {
		if(phrase[i] == ' ')
			s += " ";
		else {
			var c = phrase[i];
			if(guesses.indexOf(c) == -1)
				c = "\\_";
			s += "__" + c + "__ ";
		}
	}
	return s;
}

var nextLetter = (message, index, word) =>{
    message.react(letters[index]).then(r => {
		index++;
		if(index < letters.length) {
			if(index == 13) {
				message.channel.send(generateMessage(word, [])).then(m => {
					games.push({
						stage: 0,
						msg0: message,
						msg1: m,
						phrase: word,
						guesses: []
					});
					nextLetter(m, index);
				});
			} else {
				nextLetter(message, index, word);
			}
		}
	});
}

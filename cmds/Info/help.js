const Discord = require('discord.js');

module.exports.run = async(bot,message,args) =>{
	try {
        let help = new Discord.RichEmbed()
          .setAuthor('Danh sách các câu lệnh')
          .addField('Info',`${bot.commands.filter(cmd => cmd.config.category === 'Info').map(cmd => `\`${cmd.config.command}\``).join(" ")} `)
          .addField('Fun',`${bot.commands.filter(cmd => cmd.config.category === 'Fun').map(cmd => `\`${cmd.config.command}\``).join(" ")} `)
          .addField('Actions',`${bot.commands.filter(cmd => cmd.config.category === 'Actions').map(cmd => `\`${cmd.config.command}\``).join(" ")} `)
          .addField('Economy',`${bot.commands.filter(cmd => cmd.config.category === 'Economy').map(cmd => `\`${cmd.config.command}\``).join(" ")} `)
        message.channel.send(help);
    } catch (e) {
        message.channel.send('Không thể gửi được câu lệnh này! ');
        throw e;
    }
}

module.exports.config ={
	command: 'help'
}

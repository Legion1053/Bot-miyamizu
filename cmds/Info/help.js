const Discord = require('discord.js');

module.exports.run = async(bot,message,args) =>{
	try {
        message.channel.send(`Commands: \n\n${bot.commands.map(cmd => `\`${cmd.config.command}\``).join(" ")}`);
    } catch (e) {
        throw e;
    }
}

module.exports.config ={
	command: 'help'
}
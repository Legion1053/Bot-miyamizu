const Discord = require('discord.js');

module.exports.run = async(bot,message,args) =>{
	try {
        await message.channel.send(`Commands: \n\n${bot.commands.map(cmd => `\`${cmd.config.command}\``).join(", ")}`);
        message.channel.send("Help sent.");
    } catch (e) {
        throw e;
    }
}

module.exports.config ={
	command: 'help'
}
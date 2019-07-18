const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {

    let infoEmbed = new Discord.RichEmbed()
    .setTitle("**KaiBot info**")
    .setColor('#11ff56')
    .addField("Name", "KaiBot", true)
    .addField("Created By:", "KaiWhen#9072", true);

    message.channel.send(infoEmbed);
}

module.exports.help = {
    name: "botinfo"
}
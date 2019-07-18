const Discord = require("discord.js");
const osu = require("node-osu");
const osuApi = new osu.Api("donteventhinkaboutit");

module.exports.run = async(bot, message, args) => {
    
    let user = args[0];
    let embed = new Discord.RichEmbed();
    if(user){
    osuApi.getUser({u: user}).then(user => {

        embed
        .setTitle(`**${user.name}**`)
        .setThumbnail("https://a.ppy.sh/" + user.id)
        .addField("Ranked Score", parseInt(user.scores.ranked), true)
        .addField("Total Score", parseInt(user.scores.total), true)
        .addField("PP", user.pp.raw, true)
        .addField("Rank", `#${parseInt(user.pp.rank)}`, true);

        message.channel.send(embed);
    }).catch(err => message.channel.send("User not found"));
    

    }else{
        message.channel.send("Please enter a username");
    }

    /*osuApi.getUserBest({u: 'KaiWhen'}).then(scores => {
        console.log(scores[0].pp);
    });*/
     
}

module.exports.help = {
    name: "osu",
    aliases: "std"
}
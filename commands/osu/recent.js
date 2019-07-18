const Discord = require("discord.js");
const osu = require("node-osu");
const osuApi = new osu.Api("goaway");

module.exports.run = async(bot, message, args) => {

    let user = args[0];
    let embed = new Discord.RichEmbed();
    function round(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }
    if(user){

        osuApi.getUserRecent({u: user}).then(scores => {
    
            osuApi.getUser({u: user}).then(user => {

                osuApi.getBeatmaps({b: scores[0].beatmapId}).then(beatmaps => {

                    let userIcon = "https://a.ppy.sh/" + user.id;
                    let mods = scores[0].mods;
                    let rating = beatmaps[0].difficulty.rating;
                    let pp = scores[0].pp;

                    if(mods.length == 0) mods = "NoMod";

                    //if(pp == "nullpp") pp = "Failed/Quit";

                    embed
                    .setAuthor(`Recent play for ${user.name}`, userIcon)
                    .setThumbnail("http://b.ppy.sh/thumb/" + beatmaps[0].beatmapSetId + ".jpg")
                    .addField(`${beatmaps[0].artist} - ${beatmaps[0].title} [${beatmaps[0].version}] **+${mods}**`,
                    `**♢ ${round(rating, 2)}***\n**♢ ${pp}** (pp keeps coming out as null WHYYYY)\n${scores[0].counts[300]}`);

                    message.channel.send(embed);
                
                }).catch(err => console.log(err));

            }).catch(err => console.log(err));

        }).catch(err => console.log(err));

        
    
        }else{
            message.channel.send("Please enter a username");
        }
}

module.exports.help = {
    name: "recent",
    aliases: "r"
}
const Discord = require('discord.js');
const fs = require("fs");
const path = require("path");
const bot = new Discord.Client({autoReconnect: true});
bot.commands = new Discord.Collection();


function load(dir){

    fs.readdir(dir, (err, files) => {

    if(err) console.log(err);
    
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Could not find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        delete require.cache[require.resolve(`${dir}${f}`)];
        let props = require(`${dir}${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.aliases, props);
    });
});
}

load("./commands/general/");
load("./commands/osu/");

bot.on("ready", async () => {
    console.log(`${bot.user.username} is running`);
    //console.log(`${message.guild.members.filter(u => u.user.bot === false).size} users`);
    bot.user.setActivity("k!help");
  });


bot.on("message", async message => {

    if(message.author.type === "dm") return;
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let prefix = "k!";
    let args = messageArray.slice(1);
    

if(message.content.startsWith(prefix)){
     let commandfile = bot.commands.get(cmd.slice(prefix.length));
     if(commandfile) commandfile.run(bot, message, args);
 }else if(message.member.user.bot) return;

});


bot.login('fuck off');

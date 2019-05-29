/* 
    When publishing your bot to github to host it through something like heroku,
    make sure to set your project as private as then people do have bots scanning
    github for these kind of openings and take your token and use your bot
    for more malicious things.
*/

/*
    https://discord.js.org/#/
    Install DiscordJS: npm install discord.js
    https://nodejs.org/en/download/
    Install Node.
    https://nodemon.io/
    Reccommended - npm install -g nodemon
        - If you use typescript watchmode its the same thing. 
*/

/*
    discord is required and would not reccommend changing its name.
    client is also required but you could change the name to fit what your doing.
    discord bot programmers will either use `Client` or `Bot`
*/
const discord = require("discord.js");
const client = new discord.Client();

// Is optional if you are hosting locally or through a raspberry Pi
// Would recommend if your using a hosting website like heroku.
const botconfig = require("./botconfig");

// Will Log it to your console when it is online.
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Will Look at messages sent to the discord.
client.on("message", async message => 
{
    // If the message came from a bot then it would not continue.
    if(message.author.bot) return;
    /*
    if the message came from a direct message then it would not continue.
    Which you could use if you want a bot that can take commands as direct messages.
    */
    if(message.channel.type === "dm") return;

    // Setting up commands and prefixes.

    // let prefix =  botconfig.prefix
    let prefix = "your Prefix Here"; 
    let messageArray = message.content.split(" ");
    /*
        Using if(command =`${prefix}'command'`) will check the first index of the array
        so for example the first index in the array of !help commands the command will be !help
        and the argument commands would be a nested if in the command.
    */
    let command = messageArray[0];
    let arguments = messageArray.slice(1);

    /*
        Just a command for testing purposes.
        The if statement is going to be your way of inputting commands.
    */
    if(command === `${prefix}serverinfo`)
    {
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#42f4ee")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount);

        // returns it channel which the original message was sent from.
        return message.channel.send(serverembed);
    }
});

Client.login("Your ClientID Here");
// Client.login("botconfig.token");
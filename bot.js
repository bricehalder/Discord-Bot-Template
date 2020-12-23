const Discord = require('discord.js');
const config = require('./config.json');
const commands = require('./commands/commands').getCommands();

const client = new Discord.Client();


// eslint-disable-next-line no-unused-vars
function debugPrint(obj) {
  if (!config.prod) console.log(obj);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const guildList = client.guilds.cache.array();
  guildList.forEach((guild) => console.log(guild.name));
});

client.on('message', (message) => {
  try {
    if (!message.guild ||
        !message.content.startsWith(config.prefix) ||
         message.author.bot) return;

    if (!config.prod) {
      if (!config.testServers.includes(message.guild.id)) return;
    }

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const userCommand = args.shift().toLowerCase();

    for (Command of commands) {
      command = new Command();
      if (command.aliases.includes(userCommand)) {
        command.executeHandler(args, message);
        return;
      }
    }
    console.log(`Unrecognized command: ${userCommand}\n`);
  } catch (err) {
    console.log(err);
  }
});

client.login(config.token);

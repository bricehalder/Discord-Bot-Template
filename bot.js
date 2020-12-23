const Discord = require('discord.js');
const commands = require('./commands/commands').getCommands();
const {prefix, token, prod, prodIDs} = require('./config.json');

const client = new Discord.Client();

// eslint-disable-next-line no-unused-vars
function debugPrint(obj) {
  if (!prod) console.log(obj);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  try {
    if (message.guild) {
      if (prodIDs.includes(message.guild.id)) {
        if (!prod) return;
      }
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const userCommand = args.shift().toLowerCase();

    for (Command of commands) {
      command = new Command();
      // console.log(command.names);
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

client.login(token);

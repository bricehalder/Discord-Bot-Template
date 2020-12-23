// eslint-disable-next-line no-unused-vars
const Command = require('./command');
const Roll = require('./roll');
const Neko = require('./neko');

module.exports = {
  /**
  * Returns a list of all the Command objects.
  * @return {Command[]} A list of commands.
  */
  getCommands: () => {
    return [
      Roll.Roll,
      Neko.Neko,
    ];
  },
};

import born from './born';
import kill from './kill';
import stats from './stats';
import addresource from './addresource';
import delresource from './delresource';
import programs from './programs';

const commands = {
  born,
  kill,
  stats,
  addresource,
  delresource,
  programs
};

exports.run = function(command, term) {
  let [ cmd, ...args ] = command.split(' ');

  if (cmd === 'help'){
    if (args.length === 0){
      Object.keys(commands).forEach( c => {
        term.echo(`  ${c}: ${commands[c].help}`);
      });
      return;
    }

    let [which] = args;
    let helpCmd = commands[which];
    if (helpCmd){
      term.echo(helpCmd.help);
      return;
    }

    term.echo(notFound(helpCmd));
    return;
  }

  let theCmd = commands[cmd];
  if (!theCmd){
    term.echo(notFound(cmd));
    return;
  }

  theCmd.run.apply(term, args);
}

const notFound = cmd => {
  return `${cmd}: Command not found. Use [[u;;]help] to see the list of available commands.`;
};

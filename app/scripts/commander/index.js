import inc from './inc';

const commands = {
  inc
};

exports.run = function(command, term) {
  let [ cmd, ...args ] = command.split(' ');

  if (cmd === 'help'){
    if (args.length === 0){
      term.echo('HELP info');
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
  return `${cmd}: Command not found`;
};

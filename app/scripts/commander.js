import AsciiTable from 'ascii-table';

export default function(commands, hidden){

  const help = (term, commands, args) => {
    if (args.length === 0){

      let table = new AsciiTable();

      Object.keys(commands).forEach( c => {
        if ((hidden|| []).indexOf(c) === -1) {
          table.addRow(c, commands[c].help);
        }
      });

      table.addRow('exit', 'exit from the program that is currently running');
      table.removeBorder();
      term.echo(table.toString());
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
  };

  return function(command, term) {
    let [ cmd, ...args ] = command.split(' ');

    if (cmd === 'help'){
      return help(term, commands, args);
    }

    let theCmd = commands[cmd];
    if (!theCmd){
      term.echo(notFound(cmd));
      return;
    }

    theCmd.run.apply(term, args);
  }

};

const notFound = cmd => {
  return `${cmd}: Command not found. Use [[u;;]help] to see the list of available commands.`;
};


import store from './store';

export default function(commands, onStoreChange){

  if(onStoreChange){
    store.subscribe(() => onStoreChange(store));
  }

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

const help = (term, commands, args) => {
  if (args.length === 0){
    Object.keys(commands).forEach( c => {
      term.echo(`  ${c}: ${commands[c].help}`);
    });
    term.echo(`  exit: exit from the program that is currently running`);
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

const notFound = cmd => {
  return `${cmd}: Command not found. Use [[u;;]help] to see the list of available commands.`;
};

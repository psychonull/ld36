const version = require('../../package.json').version;
import { welcome } from './graphics';

import store from './store';

import EventEmitter from 'tiny-emitter';
import programs from './programs';
import commander from './commands';

export default class Terminal extends EventEmitter {
  static PAD = 20;

  terminal = null;

  constructor(id) {
    super();
    this.create(id);
  }

  static getWSize() {
    return {
      height: $(window).height() - Terminal.PAD * 2,
      width: $(window).width() - Terminal.PAD * 2
    };
  }

  create(id) {
    let wSize = Terminal.getWSize();

    $(`#${id}`).terminal(::this.onCommand, Object.assign(wSize, {
      greetings: welcome({ version }),
      name: 'ld36',
      prompt: '$ ',
      onInit: ::this.onInit
    }));
  }

  onCommand(command, term) {
    this.emit('before:command', command);

    if (command !== '') {
      if (programs.hasOwnProperty(command)) {
        this.emit('before:run:program', command);
        term.push(...programs[command]);
        this.emit('after:run:program', command);
      }
      else {
        this.emit('before:run:command', command);
        commander.run(command, term);
        this.emit('after:run:command', command);
      }
    }

    this.emit('after:command', command);
  }

  onInit(terminal) {
    this.terminal = terminal;

    $(window).resize(() => {
      let wSize = Terminal.getWSize();
      this.terminal.resize(wSize.width, wSize.height);
    });

    store.subscribe(() => {
      let slaves = store.getState().slaves;
      if (slaves.count === 0){
        terminal.echo('You have NO Slaves so ... GAME OVER');
      }
    });

    setTimeout(() => this.emit('ready'), 1);
  }

}

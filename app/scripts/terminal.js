const version = require('../../package.json').version;
import { welcome } from './graphics';

import store from './store';
import testActs from './actions/test';

import EventEmitter from 'tiny-emitter';

export default class Terminal extends EventEmitter {
  static pad = 20;

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
      greetings: welcome(version),
      name: 'ld36',
      prompt: '$ ',
      onInit: ::this.onInit
    }));
  }

  onCommand(command, term) {
    this.emit('before:command', command);

    if (command !== '') {
      if (command.indexOf('inc ')>-1){
        testActs.increment(parseInt(command.split(' ')[1], 10) || 0);
      }
    }

    this.emit('after:command', command);
  }

  onInit(terminal) {
    this.terminal = terminal;

    $(window).resize(() => {
      let wSize = getWSize();
      this.terminal.resize(wSize.width, wSize.height);
    });

    store.subscribe(() => {
      let state = store.getState();
      terminal.echo(`> counting: ${state.test.count}`);
    });

    setTimeout(() => this.emit('ready'), 1);
  }

}

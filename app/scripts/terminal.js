const version = require('../../package.json').version;
import { welcome } from './graphics';

import store from './store';
import { generate as generateInitialTerrains } from './actions/terrains';

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

  getProps() {
    return {
      enabled: true,
      greetings: welcome({ version }),
      name: 'ld36',
      prompt: '$ ',
      completion: [...commander.visible, ...Object.keys(programs), 'help']
    };
  }

  getWSize() {
    return {
      height: $(window).height() - Terminal.PAD * 2,
      width: ($(window).width() - Terminal.PAD * 2) - 400
    };
  }

  create(id) {
    let wSize = this.getWSize();

    $(`#${id}`).terminal(
      (command, term) => this.onCommand(command, term),
      Object.assign(wSize, this.getProps(), {
        onInit: terminal => this.onInit(terminal)
      })
    );
  }

  onCommand(command, term) {
    this.emit('before:command', command);

    if (command !== '') {

      if (this.ended){
        if (['reboot', 'exit', 'help', 'about'].indexOf(command) === -1){
          this.terminal.echo('Command Unavailable: Use [[;;;h]reboot] command to restart');
          return;
        }
      }

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

    setTimeout(() => {
      this.onReady();
      this.emit('ready');
    }, 1);
  }

  resize() {
    let wSize = this.getWSize();
    this.terminal.resize(wSize.width, wSize.height);
  }

  onReady() {
    console.log('First Run!');
    generateInitialTerrains();

    store.subscribe(() => {
      let slaves = store.getState().slaves;
      if (slaves.total === 0){
        const y = store.getState().time.year;
        const year = `[[;;;h]${Math.abs(y)} ${(y < 0 ? 'B.C.' : 'A.C.')}]`;

        window.Time.stop();
        if (this.ended) return;

        this.terminal.echo('NO more Slaves! - GAME OVER');
        this.terminal.echo(`You have got to YEAR ${year}`);
        this.terminal.echo('Use [[;;;h]reboot] command to restart');
        this.ended = true;
      }
    });
  }

}

import store from './store';

import Terminal from './terminal';
import programs from './programs';
import commander from './commands';
import stats from './commands/stats';

export default class TerminalStats extends Terminal {
  static PAD = 20;

  getProps() {
    return {
      enabled: false,
      greetings: '',
      name: '',
      prompt: '> ',
      keypress: () => { return false },
      keydown: () => { return false }
    };
  }

  getWSize() {
    return {
      height: 310 - Terminal.PAD * 2,
      width: 400 - Terminal.PAD * 2
    };
  }

  onReady() {
    store.subscribe(() => {
      this.terminal.clear();
      stats.run.apply(this.terminal);
    });

    stats.run.apply(this.terminal);
  }

}

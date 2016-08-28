import store from './store';
import Terminal from './terminal';

export default class TerminalLogs extends Terminal {
  static PAD = 10;

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
      height: $(window).height() - (310 + Terminal.PAD * 2),
      width: 400 - Terminal.PAD * 2
    };
  }

  onReady() {
    const sendLastNotis = () => {
      store.getState().notis.events
        .forEach( log => this.terminal.echo(`> ${log}`));
    };

    store.subscribe(() => {
      this.terminal.clear();
      sendLastNotis();
    });

    sendLastNotis();
  }

}

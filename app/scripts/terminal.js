
import store from './store';
import testActs from './actions/test';

const PAD = 20;
let terminal;
const version = require('../../package.json').version;

const getWSize = () => {
  return {
    height: $(window).height() - PAD * 2,
    width: $(window).width() - PAD * 2
  };
};

const init = () => {
  let wSize = getWSize();

  $('#term').terminal(function(command, term) {

    if (command !== '') {

      if (command.indexOf('inc ')>-1){
        testActs.increment(parseInt(command.split(' ')[1], 10) || 0);
      }

    }

  }, Object.assign(wSize, {
    greetings: `
  ___
 /III\\
/{= =}\\__
|_\\-/_|  \\        |\\   |  | |    |   | \\ /
jjs  |-| |-|{ |   | \\  |  | |    |   |  X
/-_--_'-nn/       |   \\|  | |___ |___| / \\ ${version}
nnn/  nnn|
==================================================
    `,
    name: 'ld36',
    prompt: '$ ',
    onInit: _terminal => {
      terminal = _terminal;

      store.subscribe(() => {
        let state = store.getState();
        terminal.echo(`> counting: ${state.test.count}`);
      });
    }
  }));

  $(window).resize(function() {
    let wSize = getWSize();
    terminal.resize(wSize.width, wSize.height);
  });

};

export default {
  init
};

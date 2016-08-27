
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
      var result = window.eval(command);
      if (result != undefined) {
        term.echo(String(result));
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
    onInit: _terminal => terminal = _terminal
  }));

  $(window).resize(function() {
    let wSize = getWSize();
    terminal.resize(wSize.width, wSize.height);
  });

};

export default {
  init
};

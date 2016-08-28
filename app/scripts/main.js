import interjection from './interjection.js';

import Terminal from './terminal.js';
import TerminalStats from './terminalStats.js';
import TerminalLogs from './terminalLogs.js';
import Time from './Time';

$(function() {
  window.Time = new Time();

  let term = new Terminal('term');
  let termStats = new TerminalStats('term-stats');
  let termNotis = new TerminalLogs('term-notis');

  function resizeEffect(){
    let midPoint = term.getWSize().width + 40;

    $('.crt-term').css({
      width: midPoint,
      top: 0,
      left: 0,
      bottom: 0
    });

    $('.crt-term-right').css({
      left: midPoint,
      top: 0,
      right: 0,
      bottom: 0
    });
  }

  term
    .on('ready', () => {
      resizeEffect();
    });

  termStats
    .on('ready', () => {
      resizeEffect();
    });

  $(window).resize(() => {
    term.resize();
    termStats.resize();
    termNotis.resize();
    resizeEffect();
  });

  interjection.show();

  //TODO: on hide interjection
  window.Time.start();
});

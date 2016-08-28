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

  term
    .on('ready', () => {
      console.log('READY!');
    })
    .on('before:command', command => {
      console.log(`Received command ${command}`);
    });

  $(window).resize(() => {
    term.resize();
    termStats.resize();
    termNotis.resize();
  });

  interjection.show();

  //TODO: on hide interjection
  window.Time.start();
});

import interjection from './interjection.js';
import Terminal from './terminal.js';
import Time from './Time';

$(function() {
  window.Time = new Time();
  let term = new Terminal('term');

  term
    .on('ready', () => {
      console.log('READY!');
    })
    .on('before:command', command => {
      console.log(`Received command ${command}`);
    });

  interjection.show();
});

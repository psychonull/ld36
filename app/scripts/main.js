import interjection from './interjection.js';
import Terminal from './Terminal.js';

$(function() {
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

import commander from '../../commander';
import current from './current.js';
import recent from './recent.js';
import available from './available.js';
import send from './send.js';
import estimate from './estimate.js';

import store from '../../store';
import onStoreChange from './onStoreChange';

const commands = {
  current,
  recent,
  available,
  send,
  estimate
};
const runCmd = commander(commands);

store.subscribe(() => onStoreChange(store));

export default [
  (cmd, term) => {
    runCmd(cmd, term);
  }, {
    prompt: 'explore>',
    onStart: (term) => {
      let explorationsState = store.getState().explorations;
      term.echo(
`=============================================
Welcome to the exploration module.
There are ${explorationsState.current.length} explorations in progress.
${explorationsState.recent.length} campaings finished recently.
=============================================`
      );
    },
    completion: Object.keys(commands)
  }
];

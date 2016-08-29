import commander from '../../commander';
import current from './current.js';
import places from '../../commands/places.js';
import send from './send.js';
//import estimate from './estimate.js';

import store from '../../store';
import onStoreChange from './onStoreChange';
import { CATEGORY } from '../../constants';

const commands = {
  current,
  available: places,
  send,
  //estimate
};

store.subscribe(() => onStoreChange());

export default [commander(commands), {
    prompt: 'enslave>',
    onStart: (term) => {
      let state = store.getState();
      let recent = state.campaigns.filter( c => c.finished && c.category === CATEGORY.ENSLAVE);
      let current = state.campaigns.filter( c => !c.finished && c.category === CATEGORY.ENSLAVE);

      term.echo(
`=============================================
Welcome to the enslave module.
There are ${current.length} enslavings in progress.
${recent.length} campaings finished recently.
=============================================`
      );
    },
    completion: Object.keys(commands)
  }
];

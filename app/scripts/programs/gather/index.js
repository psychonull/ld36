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
    prompt: 'gather>',
    onStart: (term) => {
      let state = store.getState();
      let recent = state.campaigns.filter( c => c.finished && c.category === CATEGORY.GATHER);
      let current = state.campaigns.filter( c => !c.finished && c.category === CATEGORY.GATHER);

      term.echo(
`=============================================
Welcome to the gathering module.
There are ${current.length} gathers in progress.
${recent.length} campaings finished recently.
=============================================`
      );
    },
    completion: [...Object.keys(commands), 'help']
  }
];

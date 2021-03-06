import commander from '../../commander';
import current from '../current.js';
import send from '../send.js';

import recent from './recent.js';
import available from './available.js';
import estimate from './estimate.js';

import store from '../../store';
import onStoreChange from '../onStoreChange';
import { CATEGORY } from '../../constants';

const commands = {
  current: current(CATEGORY.EXPLORATION),
  send: send(CATEGORY.EXPLORATION),
  recent,
  available,
  estimate
};

store.subscribe(() => onStoreChange(CATEGORY.EXPLORATION));

export default [commander(commands), {
    prompt: 'explore>',
    onStart: (term) => {
      let state = store.getState();
      let recent = state.campaigns.filter( c => c.finished && c.category === CATEGORY.EXPLORATION);
      let current = state.campaigns.filter( c => !c.finished && c.category === CATEGORY.EXPLORATION);

      term.echo(
`=============================================
Welcome to the exploration module.
There are ${current.length} explorations in progress.
${recent.length} campaings finished recently.
=============================================`
      );
    },
    completion: [...Object.keys(commands), 'help']
  }
];

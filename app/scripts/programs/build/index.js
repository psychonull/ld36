import commander from '../../commander';
import current from '../current.js';
import send from '../send.js';
import buildings from './buildings';

import places from '../../commands/places.js';

import store from '../../store';
import onStoreChange from '../onStoreChange';
import { CATEGORY } from '../../constants';

const commands = {
  current: current(CATEGORY.BUILD),
  send: send(CATEGORY.BUILD),
  available: places,
  buildings
};

store.subscribe(() => onStoreChange(CATEGORY.BUILD));

export default [commander(commands), {
    prompt: 'build>',
    onStart: (term) => {
      let state = store.getState();
      let recent = state.campaigns.filter( c => c.finished && c.category === CATEGORY.BUILD);
      let current = state.campaigns.filter( c => !c.finished && c.category === CATEGORY.BUILD);

      term.echo(
`=============================================
Welcome to the BUILD module.
There are ${current.length} constructions in progress.
${recent.length} campaings finished recently.
=============================================`
      );
    },
    completion: [...Object.keys(commands), 'help']
  }
];

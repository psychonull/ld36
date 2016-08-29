import store from '../../store';

import { formatYear } from './helpers.js';

export default {
  help: 'list recent exploration campaigns',
  run: function(test) {
    let state = store.getState();

    if(state.explorations.recent.length === 0){
      this.echo('No recent exploration campaigns');
    }
    else {
      state.explorations.recent.forEach((e, i) => {
        let p = e.outcome.place;
        this.echo(`Exploration #${i + 1} - started ${formatYear(e.sentAt)} - finished ${formatYear(e.finishedAt)}`);
        this.echo(`   This place has ${p.resources.sand} sand, ${p.resources.water} water, ${p.resources.stone} stone, ${p.people} people`);
        this.echo(`   ${e.outcome.newTerrains.length} new terrains that need further exploration found. (run [[i;;]available])`);
      });
    }
  }
}

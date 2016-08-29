import store from '../../store';

import { formatYear } from './helpers.js';

export default {
  help: 'list recent exploration campaigns',
  run: function() {
    let state = store.getState();
    let recent = state.explorations.filter( exp => exp.finished && !exp.failed);

    if(recent.length === 0){
      this.echo('No recent exploration campaigns');
    }
    else {
      recent.map( exp => {
        let [place] = state.places.filter( p => p.terrain === exp.terrain );

        return {
          ...exp,
          outcome: {
            newTerrains: state.terrains.filter( t => t.fromTerrain === exp.terrain ),
            place
          }
        };
      })
      .forEach( e => {
        let p = e.outcome.place || {};
        this.echo(`Exploration #${e.id} - started ${formatYear(e.sentAt)} - finished ${formatYear(e.finishAt)}`);
        this.echo(`   This place has ${p.resources.sand} sand, ${p.resources.water} water, ${p.resources.stone} stone, ${p.people} people`);
        this.echo(`   ${e.outcome.newTerrains.length} new terrains that need further exploration found. (run [[i;;]available])`);
      });
    }
  }
}

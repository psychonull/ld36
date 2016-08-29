import store from '../../store';
import { formatYear, getRisk } from './helpers.js';

export default {
  help: 'list exploration campaigns in course',
  run: function() {
    let state = store.getState();

    let currents = state.explorations.filter( exp => !exp.finished);

    if(currents.length === 0){
      this.echo('No exploration campaigns in course');
    }
    else {
      this.echo('Explorations in progress:');

      currents.map( exp => {
        let [terrain] = state.terrains.filter( t => t.id === exp.terrain )
        return {
          ...exp,
          terrain
        };
      })
      .forEach( e => {
        this.echo(`Exploration #${e.id} - started ${formatYear(e.sentAt)}:`);
        this.echo(`   Risk: ${getRisk(e.terrain.risk)}  Estimate: ${e.terrain.estimates.minTime}-${e.terrain.estimates.maxTime} years`);
        this.echo(`   Slaves sent: ${e.slavesSent}  Slaves alive: ${e.slavesAlive}`);
      });
    }
  }
}

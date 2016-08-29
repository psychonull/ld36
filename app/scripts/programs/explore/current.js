import store from '../../store';
import { formatYear, getRisk } from './helpers.js';

export default {
  help: 'list exploration campaigns in course',
  run: function(test) {
    let state = store.getState();

    if(state.explorations.current.length === 0){
      this.echo('No exploration campaigns in course');
    }
    else {
      this.echo('Explorations in progress:');
      state.explorations.current.forEach((e, i) => {
        this.echo(`Exploration #${i+1} - started ${formatYear(e.sentAt)}:`);
        this.echo(`   Risk: ${getRisk(e.terrain.risk)}  Estimate: ${e.terrain.estimates.minTime}-${e.terrain.estimates.maxTime} years`);
        this.echo(`   Slaves sent: ${e.slavesSent}  Slaves alive: ${e.slavesAlive}`);
      });
    }
  }
}

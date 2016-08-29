import store from '../../store';
import { formatYear, getRisk } from './helpers.js';
import { CATEGORY } from '../../constants';

export default {
  help: 'list enslave campaigns in course',
  run: function() {
    let state = store.getState();

    let currents = state.campaigns.filter( c => !c.finished && c.category === CATEGORY.ENSLAVE);

    if(currents.length === 0){
      this.echo('No enslave campaigns in course');
    }
    else {
      this.echo('Enslaves in progress:');

      currents.map( c => {
        let [place] = state.places.filter( t => t.id === c.place )
        return { ...c, place };
      })
      .forEach( e => {
        this.echo(`Enslaving #${e.id} - started ${formatYear(e.sentAt)}:`);
        //this.echo(`   Risk: ${getRisk(e.terrain.risk)}  Estimate: ${e.terrain.estimates.minTime}-${e.terrain.estimates.maxTime} years`);
        this.echo(`   Slaves sent: ${e.slavesSent}  Slaves alive: ${e.slavesAlive}`);
      });
    }
  }
}

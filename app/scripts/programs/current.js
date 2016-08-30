import store from '../store';
import { formatYear, getRisk } from './helpers.js';
import { CATEGORY } from '../constants';

export default function(category){
  return {
    help: `list ${category.toLowerCase()} campaigns in course`,
    run: function() {
      let state = store.getState();
      let currents = state.campaigns.filter( c => !c.finished && c.category === category);

      if(currents.length === 0){
        this.echo(`No ${category.toLowerCase()} campaigns in course`);
        return;
      }

      this.echo(`${category.toLowerCase()} in progress:`);

      switch(category){

        case CATEGORY.GATHER:
        case CATEGORY.ENSLAVE:
        case CATEGORY.BUILD: {
          currents.map( c => {
            let [place] = state.places.filter( t => t.id === c.place )
            return { ...c, place };
          })
          .forEach( e => {
            this.echo(`#${e.id} - started ${formatYear(e.sentAt)}:`);
            this.echo(`   Slaves sent: ${e.slavesSent}  Slaves alive: ${e.slavesAlive}`);
          });
          break;
        }

        case CATEGORY.EXPLORATION: {
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
          break;
        }
      }

    }
  }
}

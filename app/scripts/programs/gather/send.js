import store from '../../store';
import { gather } from '../../actions/campaigns.js';

export default {
  help: 'send [slavesAmount] [place]. Send to gather the specified number of slaves to the place.',
  run: function(slavesAmount, placeId) {
    let state = store.getState();
    let slavesp = parseInt(slavesAmount, 10);
    let pid = parseInt(placeId, 10);

    let [place] = state.places.filter( t => t.id === pid);

    if(!place){
      return this.echo('Invalid place. Use [[i;;]available] to see the list of places known for gathering');
    }

    if(place.gathering){
      return this.echo('Place currently being gather. Use [[i;;]available] to see the full list');
    }

    if(state.slaves.idle < slavesp){
      return this.echo(`Insufficient slaves. You only have ${state.slaves.idle} slaves.`);
    }

    gather(pid, slavesp, state.time.year);
    this.echo(`${slavesp} slaves sent to gather the place #${pid}`);
  }
}

import store from '../../store';
import { enslave } from '../../actions/campaigns.js';

export default {
  help: 'send [slavesAmount] [place]. Send a specific number of slaves to a places for enslaving new ones.',
  run: function(slavesAmount, placeId) {
    let state = store.getState();
    let slavesp = parseInt(slavesAmount, 10);
    let pid = parseInt(placeId, 10);

    let [place] = state.places.filter( t => t.id === pid);

    if(!place){
      return this.echo('Invalid place. Use [[i;;]available] to see the list of places known for enslaving');
    }

    if(place.enslaving){
      return this.echo('Place currently being enslaving. Use [[i;;]available] to see the full list');
    }

    if(state.slaves.idle < slavesp){
      return this.echo(`Insufficient slaves. You only have ${state.slaves.idle} slaves.`);
    }

    enslave(pid, slavesp, state.time.year);
    this.echo(`${slavesp} slaves sent to enslaving the place #${pid}`);
  }
}

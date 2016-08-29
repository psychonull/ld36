import store from '../../store';
import { explore } from '../../actions/explorations.js';

export default {
  help: 'send [slavesAmount] [terrain]. Send to explore the specified number of slaves to the terrain.',
  run: function(slavesAmount, terrainIndex) {
    let state = store.getState();
    let slavesp = parseInt(slavesAmount, 10);

    let terrain = state.explorations.terrains[terrainIndex - 1];
    if(!terrain){
      return this.echo('Invalid terrain. Use [[i;;]available] to see the list of terrains known for exploration');
    }

    if(state.slaves.idle < slavesp){
      return this.echo(`Insufficient slaves. You only have ${state.slaves.idle} slaves.`);
    }

    explore(terrain, slavesp, state.time.year);
    this.echo(`${slavesp} slaves sent to explore the terrain #${terrainIndex}`);
  }
}

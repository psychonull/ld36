import store from '../../store';
import { explore } from '../../actions/campaigns.js';

export default {
  help: 'send [slavesAmount] [terrain]. Send to explore the specified number of slaves to the terrain.',
  run: function(slavesAmount, terrainId) {
    let state = store.getState();
    let slavesp = parseInt(slavesAmount, 10);
    let tid = parseInt(terrainId, 10);

    let [terrain] = state.terrains.filter( t => t.id === tid);

    if(!terrain){
      return this.echo('Invalid terrain. Use [[i;;]available] to see the list of terrains known for exploration');
    }
    if(terrain.exploring){
      return this.echo('Terrain currently being explored. Use [[i;;]available] to see the full list');
    }
    if(terrain.explored){
      return this.echo('Terrain already explored. Use [[i;;]available] to see the full list');
    }

    if(state.slaves.idle < slavesp){
      return this.echo(`Insufficient slaves. You only have ${state.slaves.idle} slaves.`);
    }

    explore(tid, slavesp, state.time.year);
    this.echo(`${slavesp} slaves sent to explore the terrain #${tid}`);
  }
}

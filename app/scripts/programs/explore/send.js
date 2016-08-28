import store from '../../store';
import explorationsActions from '../../actions/explorations.js';

export default {
  help: `send [slavesAmount] [terrain]. Send to explore the specified number of slaves to the terrain.`,
  run: function(slavesAmount, terrainIndex) {
    let state = store.getState();

    let terrain = state.explorations.terrains[terrainIndex - 1];
    if(state.slaves.total < slavesAmount){
      return this.echo(`Insufficient slaves. You only have ${state.slaves.total} slaves.`);
    }
    if(!terrain){
      return this.echo(`Invalid terrain. Use [[i;;]available] to see the list of terrains known for exploration`);
    }
    explorationsActions.send(terrain, slavesAmount, state.time.year);
    this.echo(`${slavesAmount} slaves sent to explore the terrain`);
  }
}

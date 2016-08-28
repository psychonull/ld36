import store from '../../store';

export default {
  help: `estimate [slavesAmount] [terrain]. Analyze and estimate costs of an exploration`,
  run: function(slavesAmount, terrainIndex) {
    let state = store.getState();

    let terrain = state.explorations.terrains[terrainIndex - 1];

    if(!terrain){
      return this.echo(`Invalid terrain. Use [[i;;]available] to see the list of terrains known for exploration`);
    }

    this.echo(`Success chances: [[;;;h]${'TODO'}%]`);
    this.echo(`Time: between [[;;;h]${'TODO'}] and [[;;;h]${'TODO'}] years`);
    this.echo(`Expected deaths:  [[;;;h]${'TODO'}%]`);
  }
}

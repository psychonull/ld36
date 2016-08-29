import store from '../../store';
import { getDistance, getRisk } from './helpers.js';

export default {
  help: `estimate [slavesAmount] [terrain]. Analyze and estimate costs of an exploration`,
  run: function(slavesAmount, terrainIndex) {
    let state = store.getState();
    slavesAmount = parseInt(slavesAmount);

    let terrain = state.explorations.terrains[terrainIndex - 1];

    if(!terrain){
      return this.echo(`Invalid terrain. Use [[i;;]available] to see the list of terrains known for exploration`);
    }

    this.echo(`Time: between [[;;;h]${terrain.estimates.minTime}] and [[;;;h]${terrain.estimates.maxTime}] years (distance: ${getDistance(terrain.distance)})`);
    this.echo(`Risk is ${getRisk(terrain.risk)}: death rate might go up to around [[;;;h]${Math.floor(terrain.estimates.deathRate(slavesAmount) * 100)}%]`);
  }
}

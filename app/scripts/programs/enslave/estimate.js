import store from '../../store';
import { getDistance, getRisk } from './helpers.js';

export default {
  help: 'estimate [slavesAmount] [terrain]. Analyze and estimate costs of an exploration',
  run: function(slavesAmount, terrainId) {
    let state = store.getState();
    slavesAmount = parseInt(slavesAmount, 10);
    let tid = parseInt(terrainId, 10);

    let [terrain] = state.terrains.filter( t => t.id === tid);

    if(!terrain){
      return this.echo('Invalid terrain. Use [[i;;]available] to see the list of terrains known for exploration');
    }

    const deathRate = slaves => {
      let risk = terrain.risk;
      let distance = terrain.distance;

      const slavesFloor = 5 * risk * distance * 2;
      const riskUntilFloor = risk * .05 * (distance * 2);
      if(slaves > slavesFloor){
        return Math.min(Math.max(riskUntilFloor / (slaves / slavesFloor),0),1);
      }
      else {
        return Math.min(Math.max(riskUntilFloor, 0),1);
      }
    };

    this.echo(`Time: between [[;;;h]${terrain.estimates.minTime}] and [[;;;h]${terrain.estimates.maxTime}] years (distance: ${getDistance(terrain.distance)})`);
    this.echo(`Risk is ${getRisk(terrain.risk)}: death rate might go up to around [[;;;h]${Math.floor(deathRate(slavesAmount) * 100)}%]`);
  }
}

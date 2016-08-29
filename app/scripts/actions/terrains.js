import { bindActionCreators } from 'redux';
import store from '../store';

import { generate as generatePlace } from './places';

import Chance from 'chance';
const chance = new Chance();

let terrainsIds = 1;

chance.mixin({
  'terrain': (terrainId, direction) => {
    let distance = chance.integer({min: 1, max: 4});
    let risk = chance.integer({min: 1, max: 3});

    return {
      fromTerrain: terrainId,
      direction: direction || chance.pickone(['W','N','E','S']),
      distance,
      risk,
      estimates: {
        minTime: distance,
        maxTime: distance * 2
      }
    }
  }
});

const create = terrain => {
  return {
    type: 'TERRAINS_CREATE',
    ...terrain,
    id: terrainsIds++
  };
};

const exploring = id => {
  return {
    type: 'TERRAINS_EXPLORING',
    id
  };
};

const explored = id => {
  return {
    type: 'TERRAINS_EXPLORED',
    id
  };
};

const generate = range => {
  chance
    .n(chance.terrain, chance.integer(range || {min: 2, max: 4}))
    .forEach( t => store.dispatch(create(t)));
};

const generateFrom = terrain => {
  chance
    .n(
      chance.terrain, chance.integer({min: 0, max: 3}), terrain.id, terrain.direction
    ).forEach( t => store.dispatch(create(t)));
};

const markExplored = terrainId => {
  const state = store.getState();
  const [terrain] = state.terrains.filter( t => t.id === terrainId );
  store.dispatch(explored(terrainId));
  generateFrom(terrain);
  generatePlace(terrainId);
};

module.exports = {
  ...bindActionCreators({
    create,
    exploring,
    explored
  }, store.dispatch),
  generate,
  generateFrom,
  markExplored
};

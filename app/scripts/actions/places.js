import { bindActionCreators } from 'redux';
import store from '../store';

import Chance from 'chance';
const chance = new Chance();

let placesIds = 1;

chance.mixin({
  'place': terrain => ({ //TODO: generate a place from a terrain
    terrain: terrain.id,
    resources: {
      sand: chance.integer({min: 0, max: 300}),
      water: chance.integer({min: 0, max: 300}),
      stone: chance.integer({min: 0, max: 300})
    },
    people: chance.integer({min: 1, max: 1000})
  })
});

const create = place => {
  return {
    type: 'PLACE_CREATE',
    ...place,
    id: placesIds++
  };
};

const gather = (id, resource, amount) => {
  return {
    type: 'PLACE_GATHER',
    id,
    resource,
    amount
  };
};

const enslave = (id, amount) => {
  return {
    type: 'PLACE_ENSLAVE',
    id,
    amount
  };
};

const newBuilding = (id) => {
  return {
    type: 'PLACE_NEW_BUILDING',
    id
  };
};

const gathering = id => {
  return {
    type: 'PLACE_GATHERING',
    id
  };
};

const enslaving = id => {
  return {
    type: 'PLACE_ENSLAVING',
    id
  };
};

const building = id => {
  return {
    type: 'PLACE_BUILDING',
    id
  };
};

const generate = terrainId => {
  const [terrain] = store.getState().terrains.filter( t => t.id === terrainId );
  store.dispatch(create(chance.place(terrain)));
};

module.exports = {
  ...bindActionCreators({
    create,
    gathering,
    enslaving,
    building,
    gather,
    enslave,
    newBuilding
  }, store.dispatch),
  generate
};

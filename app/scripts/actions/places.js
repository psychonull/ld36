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

const generate = terrainId => {
  const [terrain] = store.getState().terrains.filter( t => t.id === terrainId );
  store.dispatch(create(chance.place(terrain)));
};

module.exports = {
  ...bindActionCreators({
    create
  }, store.dispatch),
  generate
};

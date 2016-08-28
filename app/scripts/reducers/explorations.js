import Chance from 'chance';
const chance = new Chance();

chance.mixin({
  'terrain': () => ({
    direction: chance.pickone(['W','N','E','S']),
    distance: chance.integer({min: 1, max: 4}),
    risk: chance.integer({min: 1, max: 3})
  })
});

const getInitialTerrains = () => {
  var amount = chance.integer({min: 2, max: 4});
  return chance.n(chance.terrain, amount);
};

const initialState = {
  current: [],
  recent: [],
  terrains: getInitialTerrains()
};

export default function(state = initialState, action) {

  return state;
}

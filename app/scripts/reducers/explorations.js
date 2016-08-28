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
  switch(action.type) {
    case 'EXPLORATIONS_SEND': {
      let current = [...state.current, {
        terrain: action.terrain,
        sentAt: action.time
      }];
      let terrains = state.terrains.filter((t) => t !== action.terrain);
      return {...state, current, terrains};
    }
    case 'EXPLORATIONS_FINISH': {
      let recent = [...state.recent, action.exploration];
      let current = state.current.filter((e) => e !== action.exploration);
      return {...state, recent, current};
    }
  }
  return state;
}

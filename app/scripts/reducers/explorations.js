import Chance from 'chance';
const chance = new Chance();

chance.mixin({
  'terrain': (direction) => ({
    direction: direction || chance.pickone(['W','N','E','S']),
    distance: chance.integer({min: 1, max: 4}),
    risk: chance.integer({min: 1, max: 3}),

  }),
  'place': (terrain) => ({
    resources: {
      sand: chance.integer({min: 0, max: 300}),
      water: chance.integer({min: 0, max: 300}),
      stone: chance.integer({min: 0, max: 300})
    },
    people: chance.integer({min: 1, max: 1000})
  })
});

const getInitialTerrains = () => {
  var amount = chance.integer({min: 2, max: 4});
  return chance.n(chance.terrain, amount);
};

const getTimeToComplete = (terrain, amount) => {
  return Math.floor(chance.normal({mean: terrain.distance * 2, dev: terrain.distance / 2 }));
};

const initialState = {
  current: [],
  recent: [],
  terrains: getInitialTerrains(),
  places: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'EXPLORATIONS_SEND': {
      let current = [...state.current, {
        terrain: action.terrain,
        slavesSent: action.slaves,
        slavesAlive: action.slaves,
        sentAt: action.time
      }];
      let terrains = state.terrains.filter((t) => t !== action.terrain);
      return {...state, current, terrains};
    }
    case 'EXPLORATIONS_FINISH': {
      let recent = [...state.recent, action.exploration];
      let current = state.current.filter((e) => e !== action.exploration);
      let places = [...state.places, chance.place(action.exploration.terrain)];
      return {...state, recent, current, places};
    }
  }
  return state;
}

import Chance from 'chance';
const chance = new Chance();
import memoize from 'lodash.memoize';

chance.mixin({
  'terrain': (direction) => {
    let distance = chance.integer({min: 1, max: 4});
    let risk = chance.integer({min: 1, max: 3});
    return {
      direction: direction || chance.pickone(['W','N','E','S']),
      distance,
      risk,
      estimates: {
        minTime: distance,
        maxTime: distance * 2,
        deathRate: (slaves) => {
          //TODO: wtf am i doin'
          const slavesFloor = 5 * risk * distance * 2;
          const riskUntilFloor = risk * .05 * (distance * 2);
          if(slaves > slavesFloor){
            return Math.min(Math.max(riskUntilFloor / (slaves / slavesFloor),0),1);
          }
          else {
            return Math.min(Math.max(riskUntilFloor, 0),1);
          }
        }
      }
    }
  },
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

const discoverMoreTerrains = (fromTerrain) => {
  var amount = chance.integer({min: 0, max: 3});
  return chance.n(chance.terrain, amount, fromTerrain.direction);
};

const getTimeToComplete = (terrain) => {
  return chance.integer({min: terrain.estimates.minTime, max: terrain.estimates.maxTime});
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
        sentAt: action.time,
        finishedAt: action.time + getTimeToComplete(action.terrain) //HACK: set finish beforehand
      }];
      let terrains = state.terrains.filter((t) => t !== action.terrain);
      return {...state, current, terrains};
    }
    case 'EXPLORATIONS_FAIL': {
      let terrains = [...state.terrains, action.exploration.terrain];
      let current = state.current.filter((e) => e !== action.exploration);
      return {...state, current, terrains};
    }
    case 'EXPLORATIONS_FINISH': {
      let place = chance.place(action.exploration.terrain);
      let newTerrains = discoverMoreTerrains(action.exploration.terrain);
      //HACK: nasty stuff
      Object.assign(action.exploration, {
        outcome: {
          place,
          newTerrains
        }
      });
      let recent = [action.exploration, ...state.recent];
      let current = state.current.filter((e) => e !== action.exploration);
      let places = [...state.places, place];
      let terrains = [...state.terrains, ...newTerrains];
      return {...state, recent, current, places, terrains};
    }
    case 'EXPLORATIONS_DEATH': {
      //HACK: more nasty stuff. mutate objects
      Object.assign(action.exploration, {
        slavesAlive: action.exploration.slavesAlive - action.amount,
        lastDeath: action.year
      });
      return {...state};
    }
  }
  return state;
}


const initialTerrain = {
  id: -1,
  direction: 'W',
  distance: 1,
  risk: 1,
  estimates: {
    minTime: 0,
    maxTime: 0,
    deathRate: 0
  },
  fromTerrain: null,

  exploring: false,
  explored: false
};

const terrain = (state = initialTerrain, action) => {
  switch(action.type) {
    case 'TERRAINS_CREATE': {
      return {...state,
        id:  action.id,
        direction: action.direction,
        distance: action.distance,
        risk: action.risk,
        estimates: {
          minTime: action.estimates.minTime,
          maxTime: action.estimates.maxTime,
          deathRate: action.estimates.deathRate
        },
        fromTerrain: action.fromTerrain || null,
      };
    }
    case 'TERRAINS_EXPLORING': {
      if (state.id !== action.id) return state;
      return {...state, exploring: true };
    }
    case 'TERRAINS_EXPLORED': {
      if (state.id !== action.id) return state;
      return {...state, explored: true, exploring: false };
    }
  }

  return state;
};

export default function(state = [], action) {
  switch(action.type) {
    case 'TERRAINS_CREATE': {
      return [...state, terrain(undefined, action)];
    }
    case 'TERRAINS_EXPLORING': {
      return state.map( t => terrain(t, action));
    }
    case 'TERRAINS_EXPLORED': {
      return state.map( t => terrain(t, action));
    }
  }

  return state;
}

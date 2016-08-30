
const initialPlace = {
  id: -1,
  terrain: -1,
  resources: {
    sand: 0,
    water: 0,
    stone: 0
  },
  people: 0,
  buildings: 0,

  gathering: false,
  enslaving: false,
  building: false
};

const place = (state = initialPlace, action) => {
  switch(action.type) {
    case 'PLACE_CREATE': {
      return {...state,
        id: action.id,
        terrain: action.terrain,
        resources: {
          sand: action.resources.sand,
          water: action.resources.water,
          stone: action.resources.stone
        },
        people: action.people
      };
    }
    case 'PLACE_GATHERING': {
      if (state.id !== action.id) return state;
      return {...state, gathering: true };
    }
    case 'PLACE_ENSLAVING': {
      if (state.id !== action.id) return state;
      return {...state, enslaving: true };
    }
    case 'PLACE_BUILDING': {
      if (state.id !== action.id) return state;
      return {...state, building: true };
    }
    case 'PLACE_GATHER': {
      if (state.id !== action.id) return state;
      return {...state,
        gathering: false,
        resources: {...state.resources,
          [action.resource]: state.resources[action.resource] - action.amount
        }
      };
    }
    case 'PLACE_ENSLAVE': {
      if (state.id !== action.id) return state;
      return {...state,
        enslaving: false,
        people: state.people - action.amount};
    }
    case 'PLACE_NEW_BUILDING': {
      if (state.id !== action.id) return state;
      return {...state,
        building: false,
        buildings: state.buildings + 1};
    }
  }

  return state;
};

export default function(state = [], action) {
  switch(action.type) {
    case 'PLACE_CREATE': {
      return [...state, place(undefined, action)];
    }
    case 'PLACE_GATHERING':
    case 'PLACE_ENSLAVING':
    case 'PLACE_BUILDING':
    case 'PLACE_ENSLAVE':
    case 'PLACE_GATHER':
    case 'PLACE_NEW_BUILDING': {
      return state.map( p => place(p, action));
    }
  }

  return state;
}

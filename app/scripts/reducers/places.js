
const initialPlace = {
  id: -1,
  terrain: -1,
  resources: {
    sand: 0,
    water: 0,
    stone: 0
  },
  people: 0
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
    case 'PLACE_GATHER': {
      if (state.id !== action.id) return state;
      return {...state,
        resources: {...state.resources,
          [action.resource]: state.resources[action.resource] - action.amount
        }
      };
    }
    case 'PLACE_ENSLAVE': {
      if (state.id !== action.id) return state;
      return {...state, people: state.people - action.amount};
    }
  }

  return state;
};

export default function(state = [], action) {
  switch(action.type) {
    case 'PLACE_CREATE': {
      return [...state, place(undefined, action)];
    }
    case 'PLACE_GATHER': {
      return state.map( p => place(p, action));
    }
    case 'PLACE_ENSLAVE': {
      return state.map( p => place(p, action));
    }
  }

  return state;
}

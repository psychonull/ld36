
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
  }

  return state;
};

export default function(state = [], action) {
  switch(action.type) {
    case 'PLACE_CREATE': {
      return [...state, place(undefined, action)];
    }
  }

  return state;
}

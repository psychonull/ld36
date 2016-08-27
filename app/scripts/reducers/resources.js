const initialState = {
  sand: 2,
  water: 5,
  stone: 3
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'RESOURCES_RECEIVE_SAND': {
      return {...state, sand: state.sand + action.amount};
    }
    case 'RESOURCES_RECEIVE_WATER': {
      return {...state, water: state.water + action.amount};
    }
    case 'RESOURCES_RECEIVE_STONE': {
      return {...state, stone: state.stone + action.amount};
    }
    case 'RESOURCES_REMOVE_SAND': {
      let sand = state.sand - action.amount;
      if (sand < 0) sand = 0;
      return {...state, sand };
    }
    case 'RESOURCES_REMOVE_WATER': {
      let water = state.water - action.amount;
      if (water < 0) water = 0;
      return {...state, water };
    }
    case 'RESOURCES_REMOVE_STONE': {
      let stone = state.stone - action.amount;
      if (stone < 0) stone = 0;
      return {...state, stone };
    }
  }

  return state;
}

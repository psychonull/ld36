const initialState = {
  count: 5
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SLAVES_RECEIVE': {
      return {...state, count: state.count + action.amount};
    }
    case 'SLAVES_DIE': {
      let count = state.count - action.amount;
      if (count < 0) count = 0;
      return {...state, count };
    }
  }

  return state;
}

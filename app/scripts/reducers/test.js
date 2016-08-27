const initialState = {
  count: 0
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'TEST_INC': {
      return {...state, count: state.count + action.value};
    }
  }

  return state;
}

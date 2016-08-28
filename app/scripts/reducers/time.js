const initialState = {
  // below 0 is BC | above 0 is AC
  year: -2000
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'TIME_NEW_YEAR': {
      return {...state, year: state.year + 1};
    }
    case 'TIME_TRAVEL_FORWARD': {
      return {...state, year: state.year + action.years};
    }
    case 'TIME_TRAVEL_BACKWARD': {
      return {...state, year: state.year - action.years};
    }
  }

  return state;
}

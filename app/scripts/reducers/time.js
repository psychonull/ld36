
const INITIAL_YEAR = -2000;
const initialState = {
  // below 0 is BC | above 0 is AC
  year: INITIAL_YEAR,
  previousYear: INITIAL_YEAR
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'TIME_NEW_YEAR': {
      return {...state, year: state.year + 1, previousYear: state.year};
    }
    case 'TIME_TRAVEL_FORWARD': {
      return {...state, year: state.year + action.years, previousYear: state.year};
    }
    case 'TIME_TRAVEL_BACKWARD': {
      return {...state, year: state.year - action.years, previousYear: state.year};
    }
  }

  return state;
}

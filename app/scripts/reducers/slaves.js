const initialState = {
  total: 5,
  childs: 2,
  adults: 2,
  ageds: 1
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SLAVES_RECEIVE': {
      let newState = {
        childs: state.childs + action.childs || 0,
        adults: state.adults + action.adults || 0,
        ageds: state.ageds + action.ageds || 0
      };

      return {...newState, total: newState.childs + newState.adults + newState.ageds};
    }
    case 'SLAVES_DIE': {
      let newState = {
        childs: state.childs - action.childs || 0,
        adults: state.adults - action.adults || 0,
        ageds: state.ageds - action.ageds || 0
      };

      const check = prop => { newState[prop] = newState[prop] < 0 ? 0 : newState[prop]; };
      ['childs', 'adults', 'ageds'].forEach( p => check(p));

      return {...newState, total: newState.childs + newState.adults + newState.ageds};
    }
    case 'SLAVES_NEW_AGE': {
      switch(action.which){
        case 'child': {
          if (state.child === 0) return state;
          return { ...state, childs: state.childs-1, adults: state.adults+1}
        }
        case 'adult': {
          if (state.child === 0) return state;
          return { ...state, adults: state.adults-1, ageds: state.ageds+1}
        }
      }
    }
  }

  return state;
}

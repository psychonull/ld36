const initialState = {
  total: 5,
  childs: 2,
  adults: 2,
  ageds: 1,
  idle: 5
};

export default function(state = initialState, action) {

  const sumUp = _state => {
    return _state.childs + _state.adults + _state.ageds;
  };

  switch(action.type) {
    case 'SLAVES_RECEIVE': {
      let newState = { ...state,
        childs: state.childs + (action.childs || 0),
        adults: state.adults + (action.adults || 0),
        ageds: state.ageds + (action.ageds || 0)
      };

      let total = sumUp(newState);
      let idle = state.idle + (total - state.total);
      return {...newState, idle, total };
    }

    case 'GATHER_DEATH':
    case 'EXPLORATIONS_DEATH':
    case 'SLAVES_DIE': {
      let newState = { ...state,
        childs: state.childs - (action.childs || 0),
        adults: state.adults - (action.adults || 0),
        ageds: state.ageds - (action.ageds || 0)
      };

      const check = prop => { newState[prop] = newState[prop] < 0 ? 0 : newState[prop]; };
      ['childs', 'adults', 'ageds'].forEach( p => check(p));

      let idle = state.idle;
      if (action.type === 'SLAVES_DIE'){
        idle--;
      }

      return {...newState, idle, total: sumUp(newState)};
    }

    case 'SLAVES_NEW_AGE': {
      switch(action.which){
        case 'born': {
          let newState = { ...state, childs: state.childs+1};
          return {...newState, idle: state.idle + 1, total: sumUp(newState)};
        }
        case 'child': {
          if (state.child === 0) return state;
          let childs = (state.childs-1 < 0 ? 0 : state.childs-1);
          let newState = { ...state, childs, adults: state.adults+1};
          return {...newState, total: sumUp(newState)};
        }
        case 'adult': {
          if (state.adult === 0) return state;
          let adults = (state.adults-1 < 0 ? 0 : state.adults-1);
          let newState = { ...state, adults, ageds: state.ageds+1};
          return {...newState, total: sumUp(newState)};
        }
      }
    }

    case 'GATHER_SEND':
    case 'EXPLORATIONS_SEND': {
      return {...state, idle: state.idle - sumUp(action)};
    }

    case 'GATHER_FINISH':
    case 'EXPLORATIONS_FINISH': {
      return {...state, idle: state.idle + action.slaves};
    }
  }

  return state;
}

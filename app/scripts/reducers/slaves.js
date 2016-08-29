const initialState = {
  total: 5,
  childs: 2,
  adults: 2,
  ageds: 1,
  idle: 5
};

export default function(state = initialState, action) {

  const sumUp = _state => {
    return (_state.childs || 0) + (_state.adults || 0) + (_state.ageds || 0);
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

    //case 'GATHER_DEATH':
    //case 'EXPLORATIONS_DEATH':
    case 'SLAVES_DIE': {
      let newState = { ...state,
        childs: state.childs - (action.childs || 0),
        adults: state.adults - (action.adults || 0),
        ageds: state.ageds - (action.ageds || 0)
      };

      const check = prop => { newState[prop] = newState[prop] < 0 ? 0 : newState[prop]; };
      ['childs', 'adults', 'ageds'].forEach( p => check(p));
/*
      let idle = state.idle;
      if (action.type === 'SLAVES_DIE'){
        idle--;
      }
*/
      return {...newState, idle: state.idle-1, total: sumUp(newState)};
    }

    case 'SLAVES_NEW_AGE': {
      switch(action.which){
        case 'born': {
          return {...state,
            childs: state.childs+1,
            idle: state.idle+1,
            total: state.total+1
          };
        }
        case 'child': {
          return {...state, childs: state.childs-1, adults: state.adults+1};
        }
        case 'adult': {
          return {...state, adults: state.adults-1, ageds: state.ageds+1};
        }
      }
    }

    case 'SLAVES_LEAVE': {
      return {...state, idle: state.idle - action.slaves};
    }

    case 'SLAVES_COME_BACK': {
      return {...state, idle: state.idle + action.slaves};
    }
  }

  return state;
}

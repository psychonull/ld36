
const initialGather = {
  id: -1,
  place: -1,
  slavesSent: 0,
  slavesAlive: 0,
  sentAt: 0,
  finishAt: 0,

  finished: false,
  failed: false
};

const gather = (state = initialGather, action) => {
  switch(action.type) {
    case 'GATHER_START': {
      let sum = (action.slaves.childs || 0) + (action.slaves.adults || 0) + (action.slaves.ageds || 0);
      return {...state,
        id: action.id,
        place: action.place,
        slavesSent: sum,
        slavesAlive: sum,
        sentAt: action.start,
        finishAt: action.end
      };
    }
    case 'GATHER_DEATH': {
      if (state.id !== action.id) return state;
      return {...state, slavesAlive: state.slavesAlive-1 };
    }
    case 'GATHER_FAIL': {
      if (state.id !== action.id) return state;
      return {...state, finished: true, failed: true };
    }
    case 'GATHER_FINISH': {
      if (state.id !== action.id) return state;
      return {...state, finished: true };
    }
  }

  return state;
};

export default function(state = [], action) {
  switch(action.type) {
    case 'GATHER_START': {
      return [...state, gather(undefined, action)];
    }
    case 'GATHER_DEATH':
    case 'GATHER_FINISH':
    case 'GATHER_FAIL': {
      return state.map( exp => gather(exp, action));
    }
  }

  return state;
}
/*

const initialState = {
  current: [],
  recent: [],
  terrains: [],
  places: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'GATHER_SEND': {
      let current = [...state.current, {
        terrain: action.terrain,
        slavesSent: action.slaves,
        slavesAlive: action.slaves,
        sentAt: action.time
      }];
      let terrains = state.terrains.filter((t) => t !== action.terrain);
      return {...state, current, terrains};
    }
    case 'GATHER_FINISH': {
      let recent = [...state.recent, action.exploration];
      let current = state.current.filter((e) => e !== action.exploration);
      let places = [...state.places, chance.place(action.exploration.terrain)];
      return {...state, recent, current, places};
    }
  }
  return state;
}
*/

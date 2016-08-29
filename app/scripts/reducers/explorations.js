
const initialExploration = {
  id: -1,
  terrain: -1,
  slavesSent: 0,
  slavesAlive: 0,
  sentAt: 0,
  finishAt: 0,

  finished: false,
  failed: false
};

const exploration = (state = initialExploration, action) => {
  switch(action.type) {
    case 'EXPLORATIONS_START': {
      let sum = (action.slaves.childs || 0) + (action.slaves.adults || 0) + (action.slaves.ageds || 0);
      return {...state,
        id: action.id,
        terrain: action.terrain,
        slavesSent: sum,
        slavesAlive: sum,
        sentAt: action.start,
        finishAt: action.end
      };
    }
    case 'EXPLORATIONS_DEATH': {
      if (state.id !== action.id) return state;
      return {...state, slavesAlive: state.slavesAlive-1 };
    }
    case 'EXPLORATIONS_FAIL': {
      if (state.id !== action.id) return state;
      return {...state, finished: true, failed: true };
    }
    case 'EXPLORATIONS_FINISH': {
      if (state.id !== action.id) return state;
      return {...state, finished: true };
    }
  }

  return state;
};

export default function(state = [], action) {
  switch(action.type) {
    case 'EXPLORATIONS_START': {
      return [...state, exploration(undefined, action)];
    }
    case 'EXPLORATIONS_DEATH':
    case 'EXPLORATIONS_FINISH':
    case 'EXPLORATIONS_FAIL': {
      return state.map( exp => exploration(exp, action));
    }
  }

  return state;
}

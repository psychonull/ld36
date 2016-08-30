import { CATEGORY } from '../constants';

const initialCampaign = {
  id: -1,
  category: '',

  //terrain: '', // for explorations
  //place: '', // for gather, enslave, build
  //building: // for build

  slavesSent: 0,
  slavesAlive: 0,
  sentAt: 0,
  finishAt: 0,

  finished: false,
  failed: false
};

const campaign = (state = initialCampaign, action) => {

  const getCampaign = () => {
    let sum = (action.slaves.childs || 0) + (action.slaves.adults || 0) + (action.slaves.ageds || 0);

    return {
      id: action.id,
      slavesSent: sum,
      slavesAlive: sum,
      sentAt: action.start,
      finishAt: action.end
    }
  };

  switch(action.type) {
    case 'EXPLORATION_START': {
      return {...state,
        ...getCampaign(),
        category: CATEGORY.EXPLORATION,
        terrain: action.terrain
      };
    }
    case 'GATHER_START': {
      return {...state,
        ...getCampaign(),
        category: CATEGORY.GATHER,
        place: action.place
      };
    }
    case 'ENSLAVE_START': {
      return {...state,
        ...getCampaign(),
        category: CATEGORY.ENSLAVE,
        place: action.place
      };
    }
    case 'BUILD_START': {
      return {...state,
        ...getCampaign(),
        category: CATEGORY.BUILD,
        place: action.place,
        building: action.building
      };
    }
    case 'CAMPAIGNS_DEATH': {
      if (state.id !== action.id) return state;
      return {...state, slavesAlive: state.slavesAlive-1 };
    }
    case 'CAMPAIGNS_FAIL': {
      if (state.id !== action.id) return state;
      return {...state, finished: true, failed: true };
    }
    case 'CAMPAIGNS_FINISH': {
      if (state.id !== action.id) return state;
      return {...state, finished: true };
    }
  }

  return state;
};

export default function(state = [], action) {
  switch(action.type) {
    case 'EXPLORATION_START':
    case 'GATHER_START':
    case 'ENSLAVE_START':
    case 'BUILD_START': {
      return [...state, campaign(undefined, action)];
    }
    case 'CAMPAIGNS_DEATH':
    case 'CAMPAIGNS_FINISH':
    case 'CAMPAIGNS_FAIL': {
      return state.map( exp => campaign(exp, action));
    }
  }

  return state;
}

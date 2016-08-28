const initialState = {
  events: []
};

const toFixed = arr => {
  let size = 30;
  return arr.length > size ? arr.slice(arr.length-size, arr.length) : arr.slice(0);
};

export default function(state = initialState, action) {

  const pushEvent = text => {
    return { events: toFixed([...state.events, text]) };
  }

  const s = qty => qty > 1 ? 's' : '';

  switch(action.type) {
    case 'SLAVES_RECEIVE': {
      if (action.childs > 0) {
        return pushEvent(`You have got ${action.childs} more Child slave${s(action.childs)}`);
      }
      if (action.adults > 0) {
        return pushEvent(`You have got ${action.adults} more Adult slave${s(action.adults)}`);
      }
      if (action.ageds > 0) {
        return pushEvent(`You have got ${action.ageds} more Elderly slave${s(action.ageds)}`);
      }
      break;
    }
    case 'SLAVES_DIE': {
      if (action.childs > 0) {
        return pushEvent(`${action.childs} Child slave${s(action.childs)} has died`);
      }
      if (action.adults > 0) {
        return pushEvent(`${action.adults} Adult slave${s(action.adults)} has died`);
      }
      if (action.ageds > 0) {
        return pushEvent(`${action.ageds} Elderly slave${s(action.ageds)} has died`);
      }
      break;
    }
    case 'SLAVES_NEW_AGE': {
      switch(action.which){
        case 'child': {
          return pushEvent('A Child slave has become an Adult');
        }
        case 'adult': {
          return pushEvent('An Adult slave is now Elderly');
        }
        break;
      }
    }
    case 'RESOURCES_RECEIVE_SAND': {
      return pushEvent(`You have collected ${action.amount} kg of Sand`);
    }
    case 'RESOURCES_RECEIVE_WATER': {
      return pushEvent(`You have collected ${action.amount} lt of Water`);
    }
    case 'RESOURCES_RECEIVE_STONE': {
      return pushEvent(`You have collected ${action.amount} kg of Stone`);
    }
    case 'RESOURCES_REMOVE_SAND': {
      return pushEvent(`You have used ${action.amount} kg of Sand`);
    }
    case 'RESOURCES_REMOVE_WATER': {
      return pushEvent(`You have used ${action.amount} lt of Water`);
    }
    case 'RESOURCES_REMOVE_STONE': {
      return pushEvent(`You have used ${action.amount} kg of Stone`);
    }
  }

  return state;
}

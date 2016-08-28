import { bindActionCreators } from 'redux';
import store from '../store';

const newYear = () => {
  return {
    type: 'TIME_NEW_YEAR'
  };
}

const travelForward = years => {
  return {
    type: 'TIME_TRAVEL_FORWARD',
    years
  };
}

const travelBackward = years => {
  return {
    type: 'TIME_TRAVEL_BACKWARD',
    years
  };
}

export default bindActionCreators({
  newYear,
  travelForward,
  travelBackward
}, store.dispatch);

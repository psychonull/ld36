import { bindActionCreators } from 'redux';
import store from '../store';

// Example of Async Actions
//const incrementAsync = value => {
//  return (dispatch) => {
//    setTimeout( () => {
//      dispatch(increment(value));
//    }, 2000);
//  }
//}

const send = (terrain, amount, time) => {
  return {
    type: 'EXPLORATIONS_SEND',
    terrain,
    time,
    slaves: amount
  };
};

const fail = (exploration) => {
  return {
    type: 'EXPLORATIONS_FAIL',
    exploration
  };
};

const finish = (exploration) => {
  return {
    type: 'EXPLORATIONS_FINISH',
    exploration
  };
};

export default bindActionCreators({
  send,
  finish
}, store.dispatch);

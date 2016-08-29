import { bindActionCreators } from 'redux';
import store from '../store';
import { getRndSlaves } from '../utils/toss';

// Example of Async Actions
//const incrementAsync = value => {
//  return (dispatch) => {
//    setTimeout( () => {
//      dispatch(increment(value));
//    }, 2000);
//  }
//}

const send = (terrain, slaves, time) => {
  return {
    type: 'EXPLORATIONS_SEND',
    terrain,
    time,
    slaves
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
    exploration,
    slaves: exploration.slavesAlive
  };
};

const death = (exploration, amount, year) => {
  return {
    type: 'EXPLORATIONS_DEATH',
    exploration,
    amount,
    year
  };
}

const explore = (terrain, slaves, time) => {
  const state = store.getState().slaves;
  store.dispatch(send(terrain, getRndSlaves(state, slaves), time));
};

module.exports = {
  ...bindActionCreators({
    send,
    finish,
    fail,
    death
  }, store.dispatch),
  explore
};

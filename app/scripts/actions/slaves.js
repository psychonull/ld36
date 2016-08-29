import { bindActionCreators } from 'redux';
import store from '../store';

const receive = (childs, adults, ageds) => {
  return {
    type: 'SLAVES_RECEIVE',
    childs, adults, ageds
  };
}

const die = (childs, adults, ageds) => {
  return {
    type: 'SLAVES_DIE',
    childs, adults, ageds
  };
}

const newAge = which => {
  return {
    type: 'SLAVES_NEW_AGE',
    which
  };
}

const leave = slaves => {
  return {
    type: 'SLAVES_LEAVE',
    slaves
  };
}

const comeBack = slaves => {
  return {
    type: 'SLAVES_COME_BACK',
    slaves
  };
}

const oneYearLifeCicle = () => {
  const probability = 0.1;
  const state = store.getState().slaves;

  const toss = () => Math.random() < probability ? true : false;

  if (state.idle > 0 && state.ageds > 0 && toss()) { // Old slave dies
    store.dispatch(die(0, 0, 1));
    return;
  }

  if (state.childs > 0 && toss()) { // child to adult
    store.dispatch(newAge('child'));
    return;
  }

  if (state.adults > 0 && toss()) { // adult to aged
    store.dispatch(newAge('adult'));
    return;
  }

  if (state.adults >= 2 && toss()) { // new child // born
    store.dispatch(newAge('born'));
  }
};

// Example of Async Actions
//const incrementAsync = value => {
//  return (dispatch) => {
//    setTimeout( () => {
//      dispatch(increment(value));
//    }, 2000);
//  }
//}

module.exports = {
  ...bindActionCreators({
    receive,
    die,
    leave,
    comeBack
  }, store.dispatch),
  oneYearLifeCicle
};

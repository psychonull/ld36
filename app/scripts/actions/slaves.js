import { bindActionCreators } from 'redux';
import store from '../store';

const receive = (childs, adults, aged) => {
  return {
    type: 'SLAVES_RECEIVE',
    childs, adults, aged
  };
}

const die = (childs, adults, aged) => {
  return {
    type: 'SLAVES_DIE',
    childs, adults, aged
  };
}

const newAge = which => {
  return {
    type: 'SLAVES_NEW_AGE',
    which
  };
}

export function oneYearLifeCicle() {
  const probability = 0.1;

  if (Math.random() < probability ? true : false) { // Old slave dies
    store.dispatch(die(0, 0, 1));
    return;
  }

  if (Math.random() < probability ? true : false) { // child to adult
    store.dispatch(newAge('child'));
    return;
  }

  if (Math.random() < probability ? true : false) { // adult to aged
    store.dispatch(newAge('adult'));
    return;
  }

  if (Math.random() < probability ? true : false) { // new child // born
    store.dispatch(receive(1, 0, 0));
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

export default bindActionCreators({
  receive,
  die
}, store.dispatch);

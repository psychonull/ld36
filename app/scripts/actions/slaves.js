import { bindActionCreators } from 'redux';
import store from '../store';

const receive = amount => {
  return {
    type: 'SLAVES_RECEIVE',
    amount
  };
}

const die = amount => {
  return {
    type: 'SLAVES_DIE',
    amount
  };
}

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

import { bindActionCreators } from 'redux';
import store from '../store';

const increment = value => {
  return {
    type: 'TEST_INC',
    value
  };
}

const incrementAsync = value => {
  return (dispatch) => {
    setTimeout( () => {
      dispatch(increment(value));
    }, 2000);
  }
}

export default bindActionCreators({
  increment,
  incrementAsync
}, store.dispatch);

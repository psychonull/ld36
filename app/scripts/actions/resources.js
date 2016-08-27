import { bindActionCreators } from 'redux';
import store from '../store';

const receiveSand = amount => {
  return {
    type: 'RESOURCES_RECEIVE_SAND',
    amount
  };
}

const receiveWater = amount => {
  return {
    type: 'RESOURCES_RECEIVE_WATER',
    amount
  };
}

const receiveStone = amount => {
  return {
    type: 'RESOURCES_RECEIVE_STONE',
    amount
  };
}

const looseSand = amount => {
  return {
    type: 'RESOURCES_REMOVE_SAND',
    amount
  };
}

const looseWater = amount => {
  return {
    type: 'RESOURCES_REMOVE_WATER',
    amount
  };
}

const looseStone = amount => {
  return {
    type: 'RESOURCES_REMOVE_STONE',
    amount
  };
}

export default bindActionCreators({
  receiveSand,
  receiveWater,
  receiveStone,
  looseSand,
  looseWater,
  looseStone
}, store.dispatch);

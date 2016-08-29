import { bindActionCreators } from 'redux';
import store from '../store';
import Chance from 'chance';
const chance = new Chance();

const send = (resource, terrain, slaves) => {
  return {
    type: 'GATHER_SEND',
    terrain,
    resource,
    slaves
  };
};

const finish = gather => {
  return {
    type: 'GATHER_FINISH',
    gather
  };
};

const collect = (resource, place, slaves) => {
  const types = chance.shuffle(['childs', 'adults', 'ageds']);
  const state = store.getState().slaves;

  // This random is not good
  let result = {};
  let total = 0;
  types.forEach( t => {
    if (state[t] > 0){
      let max = state[t] > slaves ? slaves : state[t];
      total += result[t] = chance.integer({min: Math.min(state[t], slaves), max });
      if (total >= slaves) return false;
    }
  });

  store.dispatch(send(resource, place, result));
};

module.exports = {
  ...bindActionCreators({
    send,
    finish
  }, store.dispatch),
  collect
};

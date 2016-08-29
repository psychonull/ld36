import { bindActionCreators } from 'redux';
import store from '../store';
import { getRndSlaves } from '../utils/toss';

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
  const state = store.getState().slaves;
  store.dispatch(send(resource, place, getRndSlaves(state, slaves)));
};

module.exports = {
  ...bindActionCreators({
    send,
    finish
  }, store.dispatch),
  collect
};

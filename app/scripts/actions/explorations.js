import { bindActionCreators } from 'redux';
import store from '../store';
import { getRndSlaves } from '../utils/toss';

import { exploring, markExplored } from './terrains';
import { leave as slavesLeave, comeBack as slavesComeBack } from './slaves';

let explorationIds = 1;

const start = (terrain, slaves, startTime, end) => {
  return {
    type: 'EXPLORATIONS_START',
    id: explorationIds++,
    terrain,
    slaves,
    start: startTime,
    end
  };
};

const fail = id => {
  return {
    type: 'EXPLORATIONS_FAIL',
    id
  };
};

const finishExp = id => {
  return {
    type: 'EXPLORATIONS_FINISH',
    id
  };
};

const death = (id/*, amount, year*/) => {
  return {
    type: 'EXPLORATIONS_DEATH',
    id
  };
}

const getTimeToComplete = terrain => {
  return chance.integer({
    min: terrain.estimates.minTime,
    max: terrain.estimates.maxTime
  });
};

const explore = (terrainId, slaves, startTime) => {
  const state = store.getState();
  const [terrain] = state.terrains.filter( t => t.id === terrainId );
  const end = startTime + getTimeToComplete(terrain);

  slavesLeave(slaves);
  store.dispatch(start(terrainId, getRndSlaves(state.slaves, slaves), startTime, end));
  exploring(terrainId);
};

const finish = id => {
  const state = store.getState();
  const [exp] = state.explorations.filter( e => e.id === id);
  store.dispatch(finishExp(id));
  markExplored(exp.terrain);
  slavesComeBack(exp.slavesAlive);
};

module.exports = {
  ...bindActionCreators({
    start,
    fail,
    finishExp,
    death
  }, store.dispatch),
  explore,
  finish
};

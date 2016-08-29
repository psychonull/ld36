import { bindActionCreators } from 'redux';
import store from '../store';
import { getRndSlaves, getRndSlavesAny } from '../utils/toss';

import { exploring, markExplored } from './terrains';
import slaves, { leave as slavesLeave, comeBack as slavesComeBack } from './slaves';
import resources from './resources';
import places from './places';

import { CATEGORY } from '../constants';

let explorationIds = 1;
let gathersIds = 1;
let enslavesIds = 1;
let buildsIds = 1;

const startExploration = (terrain, slaves, startTime, end) => {
  return {
    type: 'EXPLORATION_START',
    id: explorationIds++,
    terrain,
    slaves,
    start: startTime,
    end
  };
};

const startGather = (place, slaves, startTime, end) => {
  return {
    type: 'GATHER_START',
    id: gathersIds++,
    place,
    slaves,
    start: startTime,
    end
  };
};

const startEnslave = (place, slaves, startTime, end) => {
  return {
    type: 'ENSLAVE_START',
    id: enslavesIds++,
    place,
    slaves,
    start: startTime,
    end
  };
};

const fail = (id, category) => {
  return {
    type: 'CAMPAIGNS_FAIL',
    id,
    category
  };
};

const finishExp = (id, category) => {
  return {
    type: 'CAMPAIGNS_FINISH',
    id,
    category
  };
};

const death = (id, category, /*, amount, year*/) => {
  return {
    type: 'CAMPAIGNS_DEATH',
    id,
    category
  };
}

const getTimeToCompleteExploration = terrain => {
  return chance.integer({
    min: terrain.estimates.minTime,
    max: terrain.estimates.maxTime
  });
};

const getTimeToCompleteGather = place => { //TODO: build from place area km2
  return chance.integer({
    min: 1,
    max: 8
  });
};

const getTimeToCompleteEnslaving = place => { //TODO: build from place and population
  return chance.integer({
    min: 1,
    max: 8
  });
};

const getTimeToCompleteBuild = building => { //TODO: build from building size
  return chance.integer({
    min: 1,
    max: 8
  });
};

const explore = (terrainId, slaves, startTime) => {
  return (dispatch, getState) => {
    const state = getState();

    const [terrain] = state.terrains.filter( t => t.id === terrainId );

    if (terrain.exploring) return; // already exploring

    const end = startTime + getTimeToCompleteExploration(terrain);

    slavesLeave(slaves);
    dispatch(startExploration(terrainId, getRndSlaves(state.slaves, slaves), startTime, end));
    exploring(terrainId);
  };
};

const gather = (placeId, slaves, startTime) => {
  return (dispatch, getState) => {
    const state = getState();

    const [place] = state.places.filter( p => p.id === placeId);

    if (place.gathering) return; // already gathering

    const end = startTime + getTimeToCompleteGather(place);

    slavesLeave(slaves);
    dispatch(startGather(placeId, getRndSlaves(state.slaves, slaves), startTime, end));
    places.gathering(placeId);
  };
};

const enslave = (placeId, slaves, startTime) => {
  return (dispatch, getState) => {
    const state = getState();

    const [place] = state.places.filter( p => p.id === placeId);

    if (place.enslaving) return; // already enslaving

    const end = startTime + getTimeToCompleteEnslaving(place);

    slavesLeave(slaves);
    dispatch(startEnslave(placeId, getRndSlaves(state.slaves, slaves), startTime, end));
    places.enslaving(placeId);
  };
};

const finish = (id, category) => {
  // This is an Actor (used from redux-thunk to disallow double fires of same action)
  // cause on first action could change the store before it finishes entirely.
  return (dispatch, getState) => {
    const state = getState();

    const [camp] = state.campaigns.filter( c => c.id === id && c.category === category);

    if (camp.finished) return; // already finished

    dispatch(finishExp(id, category));
    slavesComeBack(camp.slavesAlive);

    switch(category){
      case CATEGORY.EXPLORATION: {
        markExplored(camp.terrain);
        break;
      }
      case CATEGORY.GATHER: {
        let [currPlace] = state.places.filter(p => p.id === camp.place);
        let resource = chance.pickone(['sand', 'water', 'stone']);
        let amount = chance.integer({ min: 1, max: currPlace.resources[resource] });

        places.gather(camp.place, resource, amount);
        resources[`receive${resource.charAt(0).toUpperCase() + resource.slice(1)}`](amount);
        break;
      }
      case CATEGORY.ENSLAVE: {
        let [currPlace] = state.places.filter(p => p.id === camp.place);
        let enslaved = chance.integer({ min: 1, max: currPlace.people });

        places.enslave(camp.place, enslaved);
        let rndSlaves = getRndSlavesAny(enslaved);
        slaves.receive(rndSlaves.childs, rndSlaves.adults, rndSlaves.ageds);
        break;
      }
    }
  };

};

module.exports = bindActionCreators({
  fail,
  death,
  finish,
  explore,
  gather,
  enslave
}, store.dispatch);

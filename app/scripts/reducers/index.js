import { combineReducers } from 'redux';
import slaves from './slaves';
import resources from './resources';
import explorations from './explorations';
import terrains from './terrains';
import places from './places';
import gathers from './gathers';
import time from './time';
import notis from './notis';

export default combineReducers({
  slaves,
  resources,
  explorations,
  terrains,
  places,
  gathers,
  time,
  notis
});

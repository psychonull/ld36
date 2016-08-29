import { combineReducers } from 'redux';
import slaves from './slaves';
import resources from './resources';
import explorations from './explorations';
import gathers from './gathers';
import time from './time';
import notis from './notis';

export default combineReducers({
  slaves,
  resources,
  explorations,
  gathers,
  time,
  notis
});

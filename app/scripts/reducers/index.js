import { combineReducers } from 'redux';
import slaves from './slaves';
import resources from './resources';
import campaigns from './campaigns';
import places from './places';
import terrains from './terrains';
import time from './time';
import notis from './notis';

export default combineReducers({
  slaves,
  resources,
  campaigns,
  terrains,
  places,
  time,
  notis
});

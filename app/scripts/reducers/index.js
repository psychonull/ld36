import { combineReducers } from 'redux';
import slaves from './slaves';
import resources from './resources';
import time from './time';

export default combineReducers({
  slaves,
  resources,
  time
});

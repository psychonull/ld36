import { combineReducers } from 'redux';
import slaves from './slaves';
import resources from './resources';
import explorations from './explorations';

export default combineReducers({
  slaves,
  resources,
  explorations
});

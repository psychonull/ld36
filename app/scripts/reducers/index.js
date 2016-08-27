import { combineReducers } from 'redux';
import slaves from './slaves';
import resources from './resources';

export default combineReducers({
  slaves,
  resources
});

import { applyMiddleware, createStore} from 'redux';
import reducers from '../reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(
  thunk,
  logger()
);

// TODO: get initialState from localStorage
const initialState = {};

const store = createStore(reducers, initialState, middleware);

export default store;

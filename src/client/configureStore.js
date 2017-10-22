import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import * as reducers from './modules';

export default (initialState) => {
  const rootReducer = combineReducers(reducers);
  const store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));

  return store;
};

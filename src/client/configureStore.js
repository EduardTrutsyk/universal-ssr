import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import * as reducers from './modules';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export default (initialState) => {
  const rootReducer = combineReducers(reducers);
  const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  sagaMiddleware.run(rootSaga);

  return store;
};

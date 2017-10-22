import { all } from 'redux-saga/effects';

import { saga as usersSaga } from './users';

export default function* rootSaga() {
  yield all([
    usersSaga(),
  ]);
}

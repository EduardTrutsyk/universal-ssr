import { call, put, all, takeLatest } from 'redux-saga/effects';

const apiUrl = 'http://jsonplaceholder.typicode.com';

// Actions
const FETCH_USERS = 'users/FETCH_USERS';
const FETCH_USER = 'users/FETCH_USER';
const UPDATE_USERS = 'users/UPDATE_USERS';
const UPDATE_CURRENT_USER = 'users/UPDATE_CURRENT_USER';

// Action Creators
export const fetchUsers = () => ({
  type: FETCH_USERS,
});
export const fetchUserById = userId => ({
  type: FETCH_USER,
  userId,
});

export const updateUsers = users => ({
  type: UPDATE_USERS,
  payload: users,
});

export const updateCurrentUser = user => ({
  type: UPDATE_CURRENT_USER,
  payload: user,
});

// Sagas
function* fetchUsersAsync() {
  const users = yield call(() => fetch(`${apiUrl}/users`).then(res => res.json()));

  yield put(updateUsers(users));
}

export function* watchFetchUsers() {
  yield takeLatest(FETCH_USERS, fetchUsersAsync);
}

export function* fetchUserByIdAsync(action) {
  const user = yield call(() => fetch(`${apiUrl}/users/${action.userId}`).then(res => res.json()));

  yield put(updateCurrentUser(user));
}

export function* watchFetchUserById() {
  yield takeLatest(FETCH_USER, fetchUserByIdAsync);
}

export function* saga() {
  yield all([
    watchFetchUsers(),
    watchFetchUserById(),
  ]);
}

// Initial state
const INITIAL_STATE = {
  loading: false,
  items: [],
};

// Reducer
export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        loading: true,
        current: null,
      };
    case UPDATE_USERS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        loading: false,
        current: action.payload,
      };
    default:
      return state;
  }
};

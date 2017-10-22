// Actions
const LOAD_USERS = 'users/LOAD_USERS';
const UPDATE_USERS = 'users/UPDATE_USERS';
const UPDATE_CURRENT_USER = 'users/UPDATE_CURRENT_USER';

// Action Creators
export const loadUsers = () => ({
  type: LOAD_USERS,
});

export const updateUsers = users => ({
  type: UPDATE_USERS,
  payload: users,
});

export const updateCurrentUser = user => ({
  type: UPDATE_CURRENT_USER,
  payload: user,
});

export const fetchUsers = () => (dispatch) => {
  dispatch(loadUsers());

  return fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => dispatch(updateUsers(users)));
};

export const fetchUserById = userId => (dispatch) => {
  dispatch(loadUsers());

  return fetch(`http://jsonplaceholder.typicode.com/users/${userId}`)
    .then(res => res.json())
    .then(users => dispatch(updateCurrentUser(users)));
};

// Initial state
const INITIAL_STATE = {
  loading: false,
  items: [],
};

// Reducer
export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case LOAD_USERS:
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

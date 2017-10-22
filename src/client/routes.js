import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/users/:userId',
    component: UserPage,
  },
  {
    path: '/users',
    component: UsersPage,
  },
];

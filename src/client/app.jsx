import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';

const App = ({ name }) => (
  <div>
    <div>Hello <b>{name}</b></div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/users">Users</Link></li>
    </ul>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/users/:userId" component={UserPage} />
      <Route path="/users" component={UsersPage} />
      <Redirect to="/" />
    </Switch>
  </div>
);

App.propTypes = {
  name: PropTypes.string.isRequired,
};

export default App;


import React from 'react';
import PropTypes from 'prop-types';

const App = ({ name }) => (
  <div>Hello <b>{name}</b></div>
);

App.propTypes = {
  name: PropTypes.string.isRequired,
};

export default App;


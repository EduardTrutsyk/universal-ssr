import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

const Users = ({ items }) => (
  <div className="users">
    {items.map(item => (
      <User item={item} key={item.id} />
    ))}
  </div>
);

Users.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
};

Users.defaultProps = {
  items: [],
};

export default Users;

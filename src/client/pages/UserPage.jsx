import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUserById } from '../modules/users';

class UserPage extends Component {
  static propTypes = {
    fetchUserById: PropTypes.func.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        userId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    loading: PropTypes.bool,
  };
  static defaultProps = {
    user: null,
    loading: false,
  };

  componentWillMount() {
    this.props.fetchUserById(this.props.match.params.userId);
  }

  render() {
    const { user, loading } = this.props;
    return (
      <div>
        <h2>UserPage</h2>
        {loading && !user ? <div>Loading...</div> : <pre>{JSON.stringify(user, null, 2)}</pre>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.current,
  loading: state.users.loading,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserById,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);

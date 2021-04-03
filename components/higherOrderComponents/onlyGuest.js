import React from 'react';
import { connect } from 'react-redux';
import Redirect from '../../utils/Redirect';

const onlyGuest = (Component) => {
  class OnlyGuest extends React.Component {
    render() {
      const { auth, dispatch, ...rest } = this.props;
      return auth.isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component {...rest} />
      );
    }
  }

  return connect(({ auth }) => ({ auth }))(OnlyGuest);
};

export default onlyGuest;

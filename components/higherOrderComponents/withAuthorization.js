import React from 'react';
import { connect } from 'react-redux';
import Redirect from '../../utils/Redirect';

const withAuthorization = (Component) => {
  class WithAuthorization extends React.Component {
    render() {
      const { auth } = this.props;
      return auth.isAuthenticated ? (
        <Component {...this.props} />
      ) : (
        <Redirect to="/auth" />
      );
    }
  }

  return connect(({ auth }) => ({ auth }))(WithAuthorization);
};

export default withAuthorization;

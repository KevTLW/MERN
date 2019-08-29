import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../../state/auth/context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => (
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      )}
    />
  );
}

export default PrivateRoute;
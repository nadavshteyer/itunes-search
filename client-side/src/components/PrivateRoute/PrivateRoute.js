import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth.js'

function PrivateRoute({ component: Component, ...rest }) {
  const context = useAuth();
  
  return(
    <Route {...rest} render={(props) => 
      context.authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signIn" /> //TODO: reditret to login
        )
    }
    />
  );
}

export default PrivateRoute;
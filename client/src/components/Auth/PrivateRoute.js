import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <CircularProgress />;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/signin',
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;

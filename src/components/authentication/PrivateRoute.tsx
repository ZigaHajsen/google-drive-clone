import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  // @ts-ignore
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import {
  Profile,
  Signup,
  Login,
  PrivateRoute,
  ForgotPassword,
  UpdateProfile,
} from './components/authentication';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute path='/profile' component={Profile} />
          <PrivateRoute path='/update-profile' component={UpdateProfile} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/forgot-password' component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;

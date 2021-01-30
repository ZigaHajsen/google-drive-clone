import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import {
  Profile,
  Signup,
  Login,
  PrivateRoute,
  ForgotPassword,
  UpdateProfile,
} from './components/authentication';
import { Dashboard } from './components/drive';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute exact path='/folder/:folderId' component={Dashboard} />
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

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { Dashboard, Signup, Login } from './components/authentication';

const App: React.FC = () => {
  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
};

export default App;

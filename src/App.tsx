import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { Signup } from './components/authentication';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <Signup />
        </div>
      </Container>
    </AuthProvider>
  );
};

export default App;

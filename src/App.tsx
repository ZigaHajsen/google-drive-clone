import React from 'react';
import { Signup } from './components/authentication';
import { Container } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Signup />
      </div>
    </Container>
  );
};

export default App;

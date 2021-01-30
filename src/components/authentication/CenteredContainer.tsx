import React from 'react';
import { Container } from 'react-bootstrap';

const CenteredContainer: React.FC = ({ children }) => {
  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        {children}
      </div>
    </Container>
  );
};

export default CenteredContainer;

import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { CenteredContainer } from '../authentication';

const ForgotPassword: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  // @ts-ignore
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current!.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false);
  };

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Reset Password</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>
              Reset Password
            </Button>
          </Form>
        </Card.Body>
        <div className='w-100 text-center mt-3'>
          <Link to='/login'>Login</Link>
        </div>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </CenteredContainer>
  );
};

export default ForgotPassword;

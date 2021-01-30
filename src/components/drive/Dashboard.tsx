import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { Navbar } from '../drive';

const Dashboard: React.FC = () => {
  return (
    <Fragment>
      <Navbar />
      <Container fluid>Content</Container>
    </Fragment>
  );
};

export default Dashboard;

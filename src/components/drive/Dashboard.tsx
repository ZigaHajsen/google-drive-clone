import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { Navbar, AddFolderButton } from '../drive';

const Dashboard: React.FC = () => {
  return (
    <Fragment>
      <Navbar />
      <Container fluid>
        <AddFolderButton />
      </Container>
    </Fragment>
  );
};

export default Dashboard;

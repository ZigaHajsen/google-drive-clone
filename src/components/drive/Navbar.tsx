import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent: React.FC = () => {
  return (
    <Navbar bg='light' expand='sm'>
      <Navbar.Brand as={Link} to='/'>
        WDS Drive
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to='/profile'>
          Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;

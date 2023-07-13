import React, { ReactNode } from 'react';

import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import AddMarkerToggleButton from '../buttons/AddMarkerToggleButton';
import CurrentLocationInput from '../inputs/CurrentLocationInput';

interface Props {
  children?: ReactNode;
}

const Header = ({ children }: Props) => {
  const navigate = useNavigate();

  const pathname = window.location.pathname;

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="mb-0 p-1 shadow-sm bg-primary text-white"
    >
      <Navbar.Brand className="ms-5 me-0 text-white">
        Parking finder
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto ps-5">
          <Nav.Link
            disabled={pathname === '/'}
            className={pathname === '/' ? 'text-white' : 'text-muted'}
            onClick={() => navigate('/')}
          >
            Home
          </Nav.Link>
          <Nav.Link
            disabled={pathname === '/profile'}
            className={
              pathname === '/profile' ? 'text-white' : 'text-muted' + ' me-1'
            }
            onClick={() => navigate('/profile')}
          >
            Profile
          </Nav.Link>
          <AddMarkerToggleButton />
        </Nav>
        <Nav className="mx-5">
          <CurrentLocationInput />
          <Nav>{children} </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

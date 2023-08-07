/* eslint-disable multiline-ternary */
import React from 'react';

import { Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import CompanyProfileNavigation from './CompanyProfileNavigation';
import DefaultProfileNavigation from './DefaultProfileNavigation';
import { getCurrentUserRoute } from '../../constants/apiRoute';
import useFetch from '../../hooks/useFetch';
import IUser from '../../interfaces/IUser';
import CurrentLocationInput from '../inputs/CurrentLocationInput';
import LoadingSpinner from '../utils/LoadingSpinner';

const Header = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch(
    'current-user',
    getCurrentUserRoute(),
    true,
    true
  );

  if (error) {
    navigate('/404');
  }

  const pathname = window.location.pathname;
  const user = data as IUser;

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
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <DefaultProfileNavigation />
              <CompanyProfileNavigation isCompany={user.isCompany} />
            </>
          )}
        </Nav>
        <Nav className="mx-5">
          {pathname === '/' && <CurrentLocationInput />}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

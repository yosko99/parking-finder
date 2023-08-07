import React from 'react';

import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DefaultProfileNavigation = () => {
  const navigate = useNavigate();

  const pathname = window.location.pathname;

  return (
    <>
      <Nav.Link
        disabled={pathname === '/reservations'}
        className={
          pathname === '/reservations' ? 'text-white' : 'text-muted' + ' me-1'
        }
        onClick={() => navigate('/reservations')}
      >
        Reservations
      </Nav.Link>
    </>
  );
};

export default DefaultProfileNavigation;

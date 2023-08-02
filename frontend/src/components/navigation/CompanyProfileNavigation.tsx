import React from 'react';

import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import AddParkingToggleButton from '../buttons/AddMarkerToggleButton';

interface Props {
  isCompany: boolean;
}

const CompanyProfileNavigation = ({ isCompany }: Props) => {
  const navigate = useNavigate();

  const pathname = window.location.pathname;

  return (
    <>
      {isCompany && (
        <>
          <Nav.Link
            disabled={pathname === '/dashboard'}
            className={
              pathname === '/dashboard' ? 'text-white' : 'text-muted' + ' me-1'
            }
            onClick={() => navigate('/dashboard')}
          >
            {'Dashboard'}
          </Nav.Link>
          {pathname === '/' && <AddParkingToggleButton />}
        </>
      )}
    </>
  );
};

export default CompanyProfileNavigation;

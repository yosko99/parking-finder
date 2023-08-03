import React from 'react';

import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import EmailInput from '../components/inputs/EmailInput';
import PasswordInput from '../components/inputs/PasswordInput';
import LoadingSpinner from '../components/utils/LoadingSpinner';
import { getLoginRoute } from '../constants/apiRoute';
import { LoginDto } from '../dtos/LoginDto';
import useAuth from '../hooks/useAuth';
import useAuthenticatedFormSubmit from '../hooks/useAuthenticatedFormSubmit';
import useFormUpdate from '../hooks/useFormUpdate';
import CenteredItems from '../styles/CenteredItems';

const LoginPage = () => {
  useAuth('/login');

  const { alert, handleSubmit, isLoading } = useAuthenticatedFormSubmit(
    getLoginRoute(),
    true,
    true
  );
  const { formData, handleChange } = useFormUpdate<LoginDto>();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <CenteredItems>
      <Form
        className="shadow-lg p-5"
        onSubmit={(e) => handleLogin(e)}
        onChange={(e) => handleChange(e)}
      >
        <p className="fs-1">Login to Parking finder</p>

        <EmailInput />
        <PasswordInput />

        <div className="d-flex justify-content-between">
          <Button variant="primary" className="me-2" type="submit">
            Login
          </Button>
          <Link to="/register">
            <Button variant="info">Register</Button>
          </Link>
        </div>
        {alert}
        {isLoading && <LoadingSpinner />}
      </Form>
    </CenteredItems>
  );
};

export default LoginPage;

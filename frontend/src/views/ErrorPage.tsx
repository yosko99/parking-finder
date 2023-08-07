import React, { useEffect } from 'react';

import { useAtom } from 'jotai';
import { Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import error404 from '../assets/404.webp';
import tokenAtom from '../atoms/token.atom';
import CenteredItems from '../styles/CenteredItems';

const ErrorPage = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const navigate = useNavigate();

  useEffect(() => {
    setToken('null');
    localStorage.removeItem('token');
  }, []);

  return (
    <CenteredItems flexColumn>
      <Image src={error404} />
      <p>Something went wrong :(</p>
      <Button onClick={() => navigate('/login')}>Go back</Button>
    </CenteredItems>
  );
};

export default ErrorPage;

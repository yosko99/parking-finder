import { useAtom } from 'jotai';

import tokenAtom from '../atoms/token.atom';

const useSetToken = () => {
  const [token, setToken] = useAtom(tokenAtom);

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString !== null) {
      return tokenString;
    }

    return null;
  };

  setToken(getToken());
};

export default useSetToken;

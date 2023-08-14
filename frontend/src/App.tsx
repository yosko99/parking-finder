import React from 'react';

import './styles/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import CustomToast from './components/utils/CustomToast';
import useSetToken from './hooks/useSetToken';
import AppRoutes from './routes';
import GlobalCSS from './styles/global.css';

const App = () => {
  useSetToken();

  return (
    <BrowserRouter>
      <div className="App">
        <GlobalCSS />
        <AppRoutes />
        <CustomToast />
      </div>
    </BrowserRouter>
  );
};

export default App;

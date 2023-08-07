import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const CustomToast = () => {
  return (
    <ToastContainer
      position="bottom-left"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      autoClose={3000}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default CustomToast;

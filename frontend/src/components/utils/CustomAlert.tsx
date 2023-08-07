import React, { FC } from 'react';

import { Alert } from 'react-bootstrap';

interface Props {
  text: string;
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
}

const CustomAlert: FC<Props> = ({ text, variant }) => {
  return <Alert className='my-3' variant={variant}>{text}</Alert>;
};

export default CustomAlert;

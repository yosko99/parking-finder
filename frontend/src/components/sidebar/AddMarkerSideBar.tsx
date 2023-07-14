import React from 'react';

// @ts-ignore
import Fade from 'react-reveal/Fade';

import AddMarkerForm from '../forms/AddMarkerForm';

const AddMarkerSideBar = () => {
  return (
    <Fade bottom>
      <AddMarkerForm />
    </Fade>
  );
};

export default AddMarkerSideBar;

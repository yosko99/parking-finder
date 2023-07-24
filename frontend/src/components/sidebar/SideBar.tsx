/* eslint-disable multiline-ternary */
import React from 'react';

import { useAtom } from 'jotai';

import AddParkingSideBar from './AddParkingSideBar';
import ParkingSideBar from './ParkingSideBar';
import isAddMarkerToggledAtom from '../../atoms/isAddMarkerToggled.atom';

const SideBar = () => {
  const [isAddMarkerToggled] = useAtom(isAddMarkerToggledAtom);

  return isAddMarkerToggled ? <AddParkingSideBar /> : <ParkingSideBar />;
};

export default SideBar;

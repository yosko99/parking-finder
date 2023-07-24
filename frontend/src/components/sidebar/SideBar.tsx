/* eslint-disable multiline-ternary */
import React from 'react';

import { useAtom } from 'jotai';

import AddParkingSideBar from './AddParkingSideBar';
import ParkingSideBar from './ParkingSideBar';
import isAddParkingToggledAtom from '../../atoms/isAddParkingToggledAtom.atom';

const SideBar = () => {
  const [isAddMarkerToggled] = useAtom(isAddParkingToggledAtom);

  return isAddMarkerToggled ? <AddParkingSideBar /> : <ParkingSideBar />;
};

export default SideBar;

/* eslint-disable multiline-ternary */
import React from 'react';

import { useAtom } from 'jotai';

import AddMarkerSideBar from './AddMarkerSideBar';
import ParkingSideBar from './ParkingSideBar';
import isAddMarkerToggledAtom from '../../atoms/isAddMarkerToggled.atom';

const SideBar = () => {
  const [isAddMarkerToggled] = useAtom(isAddMarkerToggledAtom);

  return isAddMarkerToggled ? <AddMarkerSideBar /> : <ParkingSideBar />;
};

export default SideBar;

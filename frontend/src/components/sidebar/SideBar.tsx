/* eslint-disable multiline-ternary */
import React from 'react';

import { useAtom } from 'jotai';

import AddParkingSideBar from './AddParkingSideBar';
import SelectedParkingSpaceContainer from './elements/SelectedParkingSpaceContainer';
import ParkingSideBar from './ParkingSideBar';
import isAddParkingToggledAtom from '../../atoms/isAddParkingToggledAtom.atom';
import selectedParkingIndexAtom from '../../atoms/selectedParkingIndex.atom';

const SideBar = () => {
  const [selectedParkingIndex] = useAtom(selectedParkingIndexAtom);
  const [isAddMarkerToggled] = useAtom(isAddParkingToggledAtom);

  return selectedParkingIndex !== -1 ? (
    <SelectedParkingSpaceContainer />
  ) : isAddMarkerToggled ? (
    <AddParkingSideBar />
  ) : (
    <ParkingSideBar />
  );
};

export default SideBar;

/* eslint-disable multiline-ternary */
import React from 'react';

import { useAtom } from 'jotai';

import SelectedParkingSpaceContainer from './elements/SelectedParkingSpaceContainer';
import MutateParkingSideBar from './MutateParkingSideBar';
import ParkingSideBar from './ParkingSideBar';
import isAddParkingToggledAtom from '../../atoms/isAddParkingToggledAtom.atom';
import selectedParkingIndexAtom from '../../atoms/selectedParkingIndex.atom';

const SideBar = () => {
  const [selectedParkingIndex] = useAtom(selectedParkingIndexAtom);
  const [isAddMarkerToggled] = useAtom(isAddParkingToggledAtom);

  return selectedParkingIndex !== -1 ? (
    <SelectedParkingSpaceContainer />
  ) : isAddMarkerToggled ? (
    <MutateParkingSideBar />
  ) : (
    <ParkingSideBar />
  );
};

export default SideBar;

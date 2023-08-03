/* eslint-disable multiline-ternary */
import React from 'react';

import { useAtom } from 'jotai';

import parkingsAtom from '../../../atoms/parkings.atom';
import selectedParkingIndexAtom from '../../../atoms/selectedParkingIndex.atom';
import selectedParkingSpaceIndexAtom from '../../../atoms/selectedParkingSpaceIndex.atom';
import CenteredItems from '../../../styles/CenteredItems';
import CancelReserveParkingButton from '../../buttons/parking/CancelReserveParkingButton';
import ReserveParkingButton from '../../buttons/parking/ReserveParkingButton';

const SelectedParkingSpaceContainer = () => {
  const [selectedParkingSpaceIndex] = useAtom(selectedParkingSpaceIndexAtom);
  const [selectedParkingIndex] = useAtom(selectedParkingIndexAtom);

  const [parkings] = useAtom(parkingsAtom);

  return (
    <div className="text-dark text-center">
      <p className="display-5 p-3 pb-0 mb-0">
        {parkings[selectedParkingIndex]?.title}
      </p>
      <p className="text-muted p-0">
        Free spaces: {parkings[selectedParkingIndex]?.freeSpaces}/
        {parkings[selectedParkingIndex]?.parkingSize}
      </p>
      {selectedParkingSpaceIndex === -1 ? (
        <p className="p-3 px-5 fs-1">
          Please select a parking space to continue
        </p>
      ) : (
        <p className="p-3 px-5 fs-1">
          Selected parking number: {selectedParkingSpaceIndex}
        </p>
      )}
      <CenteredItems>
        {selectedParkingSpaceIndex !== -1 && (
          <ReserveParkingButton
            index={-1}
            parking={parkings[selectedParkingIndex]}
          />
        )}
        <CancelReserveParkingButton />
      </CenteredItems>
    </div>
  );
};

export default SelectedParkingSpaceContainer;

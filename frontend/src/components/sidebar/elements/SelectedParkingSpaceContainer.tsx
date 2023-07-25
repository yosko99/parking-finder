/* eslint-disable multiline-ternary */
import React from 'react';

import { useAtom } from 'jotai';

import selectedParkingIndexAtom from '../../../atoms/selectedParkingIndex.atom';
import selectedParkingSpaceIndexAtom from '../../../atoms/selectedParkingSpaceIndex.atom';
import useFetchParkingInformation from '../../../hooks/useFetchParkingInformation';
import CenteredItems from '../../../styles/CenteredItems';
import CancelReserveParkingButton from '../../buttons/parking/CancelReserveParkingButton';
import ReserveParkingButton from '../../buttons/parking/ReserveParkingButton';

const SelectedParkingSpaceContainer = () => {
  const [selectedParkingSpaceIndex] = useAtom(selectedParkingSpaceIndexAtom);
  const [selectedParkingIndex] = useAtom(selectedParkingIndexAtom);

  const { parkings } = useFetchParkingInformation();

  return (
    <>
      {selectedParkingSpaceIndex === -1 ? (
        <p className="text-dark p-3 display-5 text-center">
          Please select a parking space to continue
        </p>
      ) : (
        <p className="text-dark p-3 display-5 text-center">
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
    </>
  );
};

export default SelectedParkingSpaceContainer;

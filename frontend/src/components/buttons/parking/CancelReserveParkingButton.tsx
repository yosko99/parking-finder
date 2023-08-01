import React from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { Button } from 'react-bootstrap';

import mainMapAtom from '../../../atoms/mainMap.atom';
import selectedParkingIndexAtom from '../../../atoms/selectedParkingIndex.atom';

const CancelReserveParkingButton = () => {
  const [mainMap] = useAtom(mainMapAtom);
  const setSelectedParkingIndex = useSetAtom(selectedParkingIndexAtom);

  const handleCancel = () => {
    if (mainMap !== null) {
      mainMap.setOptions({ draggable: true, zoomControl: true });
      setSelectedParkingIndex(-1);
    }
  };

  return (
    <Button variant="warning" onClick={handleCancel}>
      Cancel
    </Button>
  );
};

export default CancelReserveParkingButton;

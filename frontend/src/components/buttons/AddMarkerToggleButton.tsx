import React from 'react';

import { useAtom } from 'jotai';
import { Button } from 'react-bootstrap';

import isAddParkingToggledAtom from '../../atoms/isAddParkingToggledAtom.atom';
import mainMapAtom from '../../atoms/mainMap.atom';
import useResetVariables from '../../hooks/useResetVariables';
import CenteredItems from '../../styles/CenteredItems';

const AddParkingToggleButton = () => {
  const [isAddParkingToggled, setIsAddParkingToggled] = useAtom(
    isAddParkingToggledAtom
  );
  const [mainMap] = useAtom(mainMapAtom);
  const { resetVariables } = useResetVariables();

  const handleClick = () => {
    if (mainMap !== null) {
      mainMap.setOptions({
        draggable: isAddParkingToggled,
        zoomControl: isAddParkingToggled
      });
    }

    setIsAddParkingToggled((prev) => !prev);
    resetVariables();
  };

  return (
    <CenteredItems role="button" className="justify-content-start">
      <Button
        variant={`outline-${isAddParkingToggled ? 'warning' : 'info'}`}
        onClick={handleClick}
        className="p-1 px-2"
      >
        Toggle {isAddParkingToggled ? 'off' : 'on'} edit mode
      </Button>
    </CenteredItems>
  );
};

export default AddParkingToggleButton;

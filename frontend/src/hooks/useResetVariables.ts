import { useSetAtom } from 'jotai';

import directionsAtom from '../atoms/directions.atom';
import newMarkerAddressAtom from '../atoms/newMarkerAddressAtom.atom';
import parkingForEditAtom from '../atoms/parkingForEdit.atom';
import parkingSpacesAtom from '../atoms/parkingSpaces.atom';
import selectedDirectionIndexAtom from '../atoms/selectedDirectionIndex.atom';
import selectedParkingIndexAtom from '../atoms/selectedParkingIndex.atom';
import selectedParkingSpaceIndexAtom from '../atoms/selectedParkingSpaceIndex.atom';

const useResetVariables = () => {
  const setDirection = useSetAtom(directionsAtom);
  const setNewMarkerAddress = useSetAtom(newMarkerAddressAtom);
  const setSelectedDirectionIndex = useSetAtom(selectedDirectionIndexAtom);
  const setParkingSpaces = useSetAtom(parkingSpacesAtom);
  const setSelectedParkingIndex = useSetAtom(selectedParkingIndexAtom);
  const setSelectedParkingSpaceIndex = useSetAtom(
    selectedParkingSpaceIndexAtom
  );
  const setParkingForEdit = useSetAtom(parkingForEditAtom);

  const resetVariables = () => {
    setDirection(null);
    setSelectedDirectionIndex(-1);
    setSelectedParkingIndex(-1);
    setSelectedParkingSpaceIndex(-1);
    setParkingSpaces([]);
    setParkingForEdit(null);
    setNewMarkerAddress(null);
  };

  return { resetVariables };
};

export default useResetVariables;

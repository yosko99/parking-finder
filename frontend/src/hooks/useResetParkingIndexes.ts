import { useEffect } from 'react';

import { useAtom } from 'jotai';

import isAddParkingToggledAtom from '../atoms/isAddParkingToggledAtom.atom';
import selectedParkingIndexAtom from '../atoms/selectedParkingIndex.atom';
import selectedParkingSpaceIndexAtom from '../atoms/selectedParkingSpaceIndex.atom';

const useResetParkingIndexes = () => {
  const [isAddMarkerToggled, setIsAddMarkerToggled] = useAtom(
    isAddParkingToggledAtom
  );
  const [selectedParkingIndex, setSelectedParkingIndex] = useAtom(
    selectedParkingIndexAtom
  );
  const [selectedParkingSpaceIndex, setSelectedParkingSpaceIndex] = useAtom(
    selectedParkingSpaceIndexAtom
  );

  useEffect(() => {
    setIsAddMarkerToggled(false);
    setSelectedParkingIndex(-1);
    setSelectedParkingSpaceIndex(-1);
  }, []);
};

export default useResetParkingIndexes;

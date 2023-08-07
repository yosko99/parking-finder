import { atom } from 'jotai';

import ICoordinate from '../interfaces/ICoordinate';

const newMarkerAddressAtom = atom<{
  coords: ICoordinate;
  address: string;
} | null>(null);

export default newMarkerAddressAtom;

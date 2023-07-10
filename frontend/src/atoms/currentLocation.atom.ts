import { atom } from 'jotai';

import ICoordinate from '../interfaces/ICoordinate';

const currentLocationAtom = atom<ICoordinate>({
  lat: 48.8584,
  lng: 2.2945
});

export default currentLocationAtom;

import { atom } from 'jotai';

import ICoordinate from '../interfaces/ICoordinate';

const closestParkingsAtom = atom<ICoordinate[]>([
  {
    lat: 43.43909428809759,
    lng: 26.179827615157926
  },
  {
    lat: 43.30807623768245,
    lng: 25.908259316818082
  },
  {
    lat: 43.08331696300573,
    lng: 26.275271340743863
  },
  {
    lat: 42.91318228257439,
    lng: 26.445251985166998
  },
  {
    lat: 42.91318228257439,
    lng: 26.275271340743863
  },
  {
    lat: 42.91318228257439,
    lng: 26.275271340743863
  }
]);

export default closestParkingsAtom;

import { atom } from 'jotai';

import IParkingSpace from '../interfaces/IParkingSpace';

const parkingSpacesAtom = atom<IParkingSpace[]>([]);

export default parkingSpacesAtom;

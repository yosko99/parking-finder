import { atom } from 'jotai';

import IParking from '../interfaces/IParking';

const parkingForEditAtom = atom<IParking | null>(null);

export default parkingForEditAtom;

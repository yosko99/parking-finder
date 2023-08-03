import { atom } from 'jotai';

import IParking from '../interfaces/IParking';

const parkingsAtom = atom<IParking[]>([]);

export default parkingsAtom;

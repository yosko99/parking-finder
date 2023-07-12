import { atom } from 'jotai';

const tokenAtom = atom<string | null>('');

export default tokenAtom;

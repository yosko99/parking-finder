import { atom } from 'jotai';

// eslint-disable-next-line no-undef
const mainMapAtom = atom<google.maps.Map | null>(null);

export default mainMapAtom;

import { atom } from 'jotai';

// eslint-disable-next-line no-undef
const directionsAtom = atom<google.maps.DirectionsResult | null>(null);

export default directionsAtom;

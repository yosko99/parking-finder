import { atom } from 'jotai';

const timeRangeAtom = atom<{ startTime: string; endTime: string }>({
  startTime: '2023-07-05T12:15',
  endTime: '2023-07-05T12:15'
});

export default timeRangeAtom;

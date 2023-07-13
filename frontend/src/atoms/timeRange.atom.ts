import { atom } from 'jotai';

const timeRangeAtom = atom<{ startTime: string; endTime: string }>({
  startTime: '2023-07-13T12:15',
  endTime: '2023-07-13T13:45'
});

export default timeRangeAtom;

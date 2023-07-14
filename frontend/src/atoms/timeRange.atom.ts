import { atom } from 'jotai';

import getFormattedCurrentDate from '../functions/getFormattedCurrentDate';

const timeRangeAtom = atom<{ startTime: string; endTime: string }>({
  startTime: getFormattedCurrentDate(0),
  endTime: getFormattedCurrentDate(1)
});

export default timeRangeAtom;

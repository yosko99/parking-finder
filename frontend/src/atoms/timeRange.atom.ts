import { atom } from 'jotai';

import getFormattedCurrentDate from '../functions/getFormattedCurrentDate';

const timeRangeAtom = atom<{ startTime: string; endTime: string }>({
  startTime: getFormattedCurrentDate(),
  endTime: getFormattedCurrentDate()
});

export default timeRangeAtom;

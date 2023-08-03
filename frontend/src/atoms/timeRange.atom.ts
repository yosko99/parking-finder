import { atom } from 'jotai';

import getFormattedCurrentDate from '../functions/getFormattedCurrentDate';
import ITimeRange from '../interfaces/ITameRange';

const timeRangeAtom = atom<ITimeRange>({
  startTime: getFormattedCurrentDate(),
  endTime: getFormattedCurrentDate()
});

export default timeRangeAtom;

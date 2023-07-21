import TimeFrameEnum from 'src/enums/TimeFrameEnum';
import getTimeBoundary from './getTimeBoundary';
import formatDate from './formatDate';

const getSalesInfo = (
  startTime: string,
  timeFrame: TimeFrameEnum,
  currentSales: number,
  prevSales: number,
) => {
  const { selectedTimeFrame } = getTimeBoundary(
    new Date(startTime),
    timeFrame,
    false,
  );
  const tempDate =
    currentSales !== 0
      ? startTime
      : formatDate(selectedTimeFrame.toISOString());

  return {
    current: currentSales,
    prev: prevSales,
    date: tempDate,
  };
};

export default getSalesInfo;

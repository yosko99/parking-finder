import TimeFrameEnum from 'src/enums/TimeFrameEnum';

const getTimeBoundary = (timeFrame: TimeFrameEnum) => {
  const selectedTimeFrame = new Date();
  const prevTimeFrame = new Date();

  const getTimeOffset = (days: number, months?: number) => {
    selectedTimeFrame.setDate(selectedTimeFrame.getDate() - days);
    prevTimeFrame.setDate(prevTimeFrame.getDate() - days * 2);

    if (months > 0) {
      selectedTimeFrame.setMonth(selectedTimeFrame.getMonth() - months);
      prevTimeFrame.setMonth(prevTimeFrame.getMonth() - months * 2);
    }
  };

  switch (timeFrame) {
    case TimeFrameEnum.DAY:
      getTimeOffset(1);
      break;
    case TimeFrameEnum.WEEK:
      getTimeOffset(7);
      break;
    case TimeFrameEnum.MONTH:
      getTimeOffset(0, 1);
      break;
    case TimeFrameEnum.DAYS90:
      getTimeOffset(90, 0);
      break;
  }

  return { selectedTimeFrame, prevTimeFrame };
};

export default getTimeBoundary;

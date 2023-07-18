import TimeFrameEnum from 'src/enums/TimeFrameEnum';

const getTimeBoundary = (timeFrame: TimeFrameEnum): Date => {
  const currentDate = new Date();

  switch (timeFrame) {
    case TimeFrameEnum.DAY:
      currentDate.setDate(currentDate.getDate() - 1);
      break;
    case TimeFrameEnum.WEEK:
      currentDate.setDate(currentDate.getDate() - 7);
      break;
    case TimeFrameEnum.MONTH:
      currentDate.setMonth(currentDate.getMonth() - 1);
      break;
    case TimeFrameEnum.DAYS90:
      currentDate.setDate(currentDate.getDate() - 90);
      break;
  }

  return currentDate;
};

export default getTimeBoundary;

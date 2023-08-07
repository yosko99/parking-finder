import TimeFrameEnum from 'src/enums/TimeFrameEnum';

const getTimeBoundary = (
  selectedDate: Date,
  timeFrame: TimeFrameEnum,
  isPast: boolean,
) => {
  const date = new Date(selectedDate);
  const prevDate = new Date(selectedDate);

  const getTimeOffset = (days: number, months?: number) => {
    const updatedSelectedTime = isPast
      ? date.getDate() - days
      : date.getDate() + days;
    const updatedPrevTime = isPast
      ? prevDate.getDate() - days * 2
      : prevDate.getDate() + days * 2;

    date.setDate(updatedSelectedTime);
    prevDate.setDate(updatedPrevTime);

    if (months > 0) {
      const updatedSelectedTime = isPast
        ? date.getMonth() - months
        : date.getMonth() + months;
      const updatedPrevTime = isPast
        ? prevDate.getMonth() - months * 2
        : prevDate.getMonth() + months * 2;

      date.setMonth(updatedSelectedTime);
      prevDate.setMonth(updatedPrevTime);
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

  return { selectedTimeFrame: date, prevTimeFrame: prevDate };
};

export default getTimeBoundary;

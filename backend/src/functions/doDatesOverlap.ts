const doDatesOverlap = (
  startTime: Date,
  endTime: Date,
  reservationStartTime: Date,
  reservationEndTime: Date,
) => {
  if (startTime <= reservationStartTime && reservationStartTime <= endTime) {
    return true;
  }
  if (startTime <= reservationEndTime && reservationEndTime <= endTime) {
    return true;
  }
  if (reservationStartTime < startTime && endTime < reservationEndTime) {
    return true;
  }

  return false;
};

export default doDatesOverlap;

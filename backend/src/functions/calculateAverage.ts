const calculateAverage = (value1: number, value2: number) => {
  if (value1 !== 0 && value2 !== 0) {
    return value2 / value1;
  } else {
    return 0;
  }
};
export default calculateAverage;

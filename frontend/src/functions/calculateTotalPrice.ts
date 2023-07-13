const calculateTotalPrice = (
  startDate: string,
  endDate: string,
  hourlyPrice: number
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = end.getTime() - start.getTime();

  const hours = duration / (1000 * 60 * 60);

  const totalPrice = Math.ceil(hours * hourlyPrice * 100) / 100;

  return totalPrice;
};

export default calculateTotalPrice;

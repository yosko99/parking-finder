import { TRANSACTION_FEE } from '../constants/prices';

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

  if (totalPrice === 0) {
    return totalPrice;
  } else {
    return totalPrice + TRANSACTION_FEE;
  }
};

export default calculateTotalPrice;

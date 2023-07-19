import IReservation from './IReservation';
import ISales from './ISales';

interface IDashboardResponse {
  totalSales: { current: number; prev: number };
  totalReservations: { current: number; prev: number };
  averageSales: { current: number; prev: number };
  sales: ISales[];
  locations: { name: string; value: number }[];
  averageDuration: { current: number; prev: number };
  freeSpaces: { name: string; value: number }[];
  reservations: IReservation[];
}

export default IDashboardResponse;

interface IDashboardResponse {
  totalSales: number;
  totalReservations: number;
  averageSales: number;
  sales: number[];
  locations: { name: string; value: number }[];
  averageDuration: number;
  freeSpaces: { name: string; value: number }[];
}

export default IDashboardResponse;

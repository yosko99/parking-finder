interface IDashboardResponse {
  totalSales: number;
  totalReservations: number;
  averageSales: number;
  sales: number[];
  locations: { country: string; count: number }[];
}

export default IDashboardResponse;

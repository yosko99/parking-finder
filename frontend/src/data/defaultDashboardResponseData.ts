import IDashboardResponse from '../interfaces/IDashboardResponse';

const defaultDashboardResponseData: IDashboardResponse = {
  averageSales: { current: 0, prev: 0 },
  locations: [],
  sales: [],
  totalReservations: { current: 0, prev: 0 },
  totalSales: { current: 0, prev: 0 },
  averageDuration: { current: 0, prev: 0 },
  freeSpaces: []
};

export default defaultDashboardResponseData;

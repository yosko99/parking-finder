import TimeFrameType from '../types/TimeFrameType';

const API_PREFIX = '/api/';

export const PROXY_URL = 'http://localhost:5000';

export const PUBLIC_IMAGES_PREFIX = PROXY_URL + '/public/';

// USERS
export const getUsersRoute = () => API_PREFIX + 'users';

export const getLoginRoute = () => getUsersRoute() + '/login';

export const getCurrentUserRoute = () => getUsersRoute() + '/current';

export const getCurrentUserParkingsRoute = () =>
  getUsersRoute() + '/current/parkings';

export const getCurrentUserReservationsRoute = () =>
  getUsersRoute() + '/current/reservations';

export const getCurrentUserDashboardRoute = (
  parkingTitle: string,
  timeFrame: TimeFrameType
) =>
  getUsersRoute() +
  `/current/dashboard?parkingTitle=${parkingTitle}&timeRange=${timeFrame}`;

// PARKINGS
export const getParkingsRoute = () => API_PREFIX + 'parkings';

// PARKINGS
export const getParkingRoute = (id: string) => API_PREFIX + `parkings/${id}`;

export const getParkingFreeSpacesWithinTimeFrame = (
  id: string,
  startTimeISOString: string,
  endTimeISOString: string
) =>
  API_PREFIX +
  `parkings/${id}/free-spaces?startTime=${startTimeISOString}&endTime=${endTimeISOString}`;

export const getParkingsWithinRangeRoute = (
  lat: number,
  lng: number,
  startTimeISOString: string,
  endTimeISOString: string
) =>
  API_PREFIX +
  `parkings?lat=${lat}&lng=${lng}&startTime=${startTimeISOString}&endTime=${endTimeISOString}`;

// RESERVATIONS
export const getReservationsRoute = () => API_PREFIX + 'reservations';

// GOOGLE
export const getGeocodeRoute = (address: string) =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

export const getReverseGeocodeRoute = (lat: number, lng: number) =>
  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

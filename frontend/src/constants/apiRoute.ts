const API_PREFIX = '/api/';

export const PROXY_URL = 'http://localhost:5000';

export const PUBLIC_IMAGES_PREFIX = PROXY_URL + '/public/';

// USERS
export const getUsersRoute = () => API_PREFIX + 'users';

export const getLoginRoute = () => getUsersRoute() + '/login';

export const getCurrentUserRoute = () => getUsersRoute() + '/current';

// PARKINGS
export const getParkingsRoute = () => API_PREFIX + 'parkings';

// GOOGLE
export const getGeocodeRoute = (address: string) =>
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

export const getReverseGeocodeRoute = (lat: number, lng: number) =>
  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

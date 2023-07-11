const API_PREFIX = '/api/';

export const PROXY_URL = 'http://localhost:5000';

export const PUBLIC_IMAGES_PREFIX = PROXY_URL + '/public/';

// USERS
export const getUsersRoute = () => API_PREFIX + 'users';

export const getLoginRoute = () => getUsersRoute() + '/login';

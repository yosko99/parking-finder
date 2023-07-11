import ICoordinate from '../interfaces/ICoordinate';

const getCurrentLocation = (): Promise<ICoordinate> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location: ICoordinate = { lat: latitude, lng: longitude };
          resolve(location);
        },
        (error) => {
          console.error('Error getting current location:', error);
          reject(error);
        }
      );
    } else {
      const defaultLocation: ICoordinate = { lat: 48.8584, lng: 2.2945 };
      console.error('Geolocation is not supported by this browser.');
      resolve(defaultLocation);
    }
  });
};

export default getCurrentLocation;

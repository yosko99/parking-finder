const isLatitude = (num) => isFinite(num) && Math.abs(num) <= 90;
const isLongitude = (num) => isFinite(num) && Math.abs(num) <= 180;

const areCoordsValid = (lat: number, lng: number) => {
  return isLatitude(lat) && isLongitude(lng);
};

export default areCoordsValid;

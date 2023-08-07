import ICoordinate from '../interfaces/ICoordinate';
import IParkingSpace from '../interfaces/IParkingSpace';

const checkAngle = (angle: number, doIncrementAngle: boolean) => {
  if (doIncrementAngle) {
    return angle === 360 ? 0 : angle + 10;
  } else {
    return angle === 0 ? 360 : angle - 10;
  }
};

const getCenter = (points: ICoordinate[]): ICoordinate => {
  const sumX = points.reduce((acc, point) => acc + point.lng, 0);
  const sumY = points.reduce((acc, point) => acc + point.lat, 0);
  const centerX = sumX / points.length;
  const centerY = sumY / points.length;
  return { lat: centerY, lng: centerX };
};

const rotateParkingSpace = (
  parkingSpace: IParkingSpace,
  doIncrementAngle: boolean
): IParkingSpace => {
  const radians = (doIncrementAngle ? 10 : -10) * (Math.PI / 180);

  const cosTheta = Math.cos(radians);
  const sinTheta = Math.sin(radians);

  const center = getCenter(parkingSpace.paths);

  const rotatedCoordinates = parkingSpace.paths.map((path) => {
    const translatedX = path.lng - center.lng;
    const translatedY = path.lat - center.lat;

    const rotatedX = translatedX * cosTheta - translatedY * sinTheta;
    const rotatedY = translatedX * sinTheta + translatedY * cosTheta;

    const rotatedLng = center.lng + rotatedX;
    const rotatedLat = center.lat + rotatedY;

    return { lat: rotatedLat, lng: rotatedLng };
  });

  return {
    paths: rotatedCoordinates,
    angle: checkAngle(parkingSpace.angle, doIncrementAngle)
  };
};

export default rotateParkingSpace;

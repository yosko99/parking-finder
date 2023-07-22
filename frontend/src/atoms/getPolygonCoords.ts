import { METER_TO_LAT, METER_TO_LNG } from '../constants/coordMeters';
import ICoordinate from '../interfaces/ICoordinate';

const getPolygonCoords = (
  startLat: number,
  startLng: number,
  angle: number
): ICoordinate[] => {
  // Define the coordinates of the rectangle relative to the center point
  const rectangleCoordinatesRelative = [
    { lat: 1.5 * METER_TO_LAT, lng: -1 * METER_TO_LNG }, // Top left corner
    { lat: 1.5 * METER_TO_LAT, lng: 1 * METER_TO_LNG }, // Top right corner
    { lat: -1.5 * METER_TO_LAT, lng: 1 * METER_TO_LNG }, // Bottom right corner
    { lat: -1.5 * METER_TO_LAT, lng: -1 * METER_TO_LNG } // Bottom left corner
  ];

  // Convert angle from degrees to radians
  const radians = (angle * Math.PI) / 180;

  // Calculate the sine and cosine of the angle
  const cosTheta = Math.cos(radians);
  const sinTheta = Math.sin(radians);

  // Rotate and translate the coordinates
  const rotatedCoordinates = rectangleCoordinatesRelative.map(
    ({ lat, lng }) => {
      // Apply rotation
      const rotatedX = lng * cosTheta - lat * sinTheta;
      const rotatedY = lng * sinTheta + lat * cosTheta;

      // Apply translation to the center
      const translatedLat = startLat + rotatedY;
      const translatedLng = startLng + rotatedX;

      return { lat: translatedLat, lng: translatedLng };
    }
  );

  return rotatedCoordinates;
};

export default getPolygonCoords;

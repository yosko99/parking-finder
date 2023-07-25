import { METER_TO_LAT, METER_TO_LNG } from '../constants/coordMeters';
import ICoordinate from '../interfaces/ICoordinate';

const getPolygonCoords = (
  startLat: number,
  startLng: number,
  angle: number
): ICoordinate[] => {
  const widthMeters = 2.8;
  const lengthMeters = 5.0;

  const rectangleCoordinatesRelative = [
    {
      lat: (lengthMeters / 2) * METER_TO_LAT,
      lng: (-widthMeters / 2) * METER_TO_LNG
    }, // Top left corner
    {
      lat: (lengthMeters / 2) * METER_TO_LAT,
      lng: (widthMeters / 2) * METER_TO_LNG
    }, // Top right corner
    {
      lat: (-lengthMeters / 2) * METER_TO_LAT,
      lng: (widthMeters / 2) * METER_TO_LNG
    }, // Bottom right corner
    {
      lat: (-lengthMeters / 2) * METER_TO_LAT,
      lng: (-widthMeters / 2) * METER_TO_LNG
    } // Bottom left corner
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

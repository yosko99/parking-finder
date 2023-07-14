export interface DistanceService {
  toRadians(degrees: number): number;

  convertToLng(lat: number, distance: number): number;

  convertToLat(distance: number): number;
}

export const DistanceService = Symbol('DistanceService');

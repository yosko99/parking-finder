import { Injectable } from '@nestjs/common';
import { DistanceService } from './distance.service';

@Injectable()
export class DistanceServiceImpl implements DistanceService {
  private earthRadius = 6371;

  toRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
  };

  convertToLng = (lat: number, distance: number): number => {
    const latRadians = this.toRadians(lat);
    return (
      ((distance / this.earthRadius) * (180 / Math.PI)) / Math.cos(latRadians)
    );
  };

  convertToLat = (distance: number) => {
    return (distance / this.earthRadius) * (180 / Math.PI);
  };
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import {
  getGeocodeRoute,
  getReverseGeocodeRoute,
} from 'src/constants/thirdPartyApis';
import { GeocodeDto, ReverseGeocodeDto } from 'src/dto/google.dto';
import areCoordsValid from 'src/functions/areCoordsValid';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class GoogleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly cache: CacheService,
  ) {}

  private readonly logger = new Logger(GoogleService.name);

  async getGeocode({ address }: GeocodeDto) {
    this.logger.log(`Fetching geocode information for address (${address})`);

    return this.cache.getOrSetCache(`geocode-${address}`, async () => {
      return await this.fetchData(getGeocodeRoute(address));
    });
  }

  async getReserveGeocode({ lat, lng }: ReverseGeocodeDto) {
    this.logger.log(
      `Fetching reverse geocode information with latLng ('${lat}'-'${lng}')`,
    );

    if (!areCoordsValid(lat, lng)) {
      this.logger.error(`Coordinates ('${lat}'-'${lng}') are invalid`);
      throw new HttpException('Invalid coordinates', 400);
    }

    return this.cache.getOrSetCache(
      `reverse-geocode-${lat}-${lng}`,
      async () => {
        return await this.fetchData(getReverseGeocodeRoute(lat, lng));
      },
    );
  }

  private fetchData(url: string) {
    return this.httpService
      .get(url)
      .toPromise()
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.status);
        throw new HttpException(error.message, 500);
      });
  }
}

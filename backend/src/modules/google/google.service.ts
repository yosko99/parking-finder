import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import {
  getGeocodeRoute,
  getReverseGeocodeRoute,
} from 'src/constants/thirdPartyApis';
import { GeocodeDto, ReverseGeocodeDto } from 'src/dto/google.dto';
import areCoordsValid from 'src/functions/areCoordsValid';

@Injectable()
export class GoogleService {
  constructor(private readonly httpService: HttpService) {}

  async getGeocode({ address }: GeocodeDto) {
    return this.fetchData(getGeocodeRoute(address));
  }

  async getReserveGeocode({ lat, lng }: ReverseGeocodeDto) {
    if (!areCoordsValid(lat, lng)) {
      throw new HttpException('Invalid coordinates', 400);
    }
    return this.fetchData(getReverseGeocodeRoute(lat, lng));
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

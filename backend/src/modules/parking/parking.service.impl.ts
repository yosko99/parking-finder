import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ParkingService } from './parking.service';
import { CreateParkingDto, ParkingsWithinRangeDto } from 'src/dto/parking.dto';
import IToken from 'src/interfaces/IToken';
import IReservation from 'src/interfaces/IReservation';
import { DistanceService } from '../utils/distance.service';

@Injectable()
export class ParkingServiceImpl implements ParkingService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(DistanceService) private readonly distanceService: DistanceService,
  ) {}

  async createParking(
    {
      address,
      description,
      hourlyPrice,
      lat,
      lng,
      parkingSize,
      title,
    }: CreateParkingDto,
    { email }: IToken,
  ) {
    const doestParkingExist =
      (await this.prisma.parking.findFirst({
        where: { title },
      })) !== null;

    if (doestParkingExist) {
      throw new HttpException('Title is already taken', 409);
    }

    const newParking = await this.prisma.parking.create({
      data: {
        address,
        description,
        hourlyPrice,
        lat,
        lng,
        parkingSize,
        title,
        owner: { connect: { email } },
      },
    });

    return {
      message: 'Parking created successfully',
      parking: newParking,
    };
  }

  async getParkingsWithinRange({
    endTime,
    lat,
    lng,
    startTime,
  }: ParkingsWithinRangeDto) {
    const beginTime = startTime || new Date();
    const exitTime =
      endTime || new Date(new Date().setHours(new Date().getHours() + 1));

    const distanceInKilometers = 5;

    try {
      const parkings = await this.prisma.parking.findMany({
        where: {
          lat: {
            gte:
              Number(lat) -
              this.distanceService.convertToLat(distanceInKilometers),
            lte:
              Number(lat) +
              this.distanceService.convertToLat(distanceInKilometers),
          },
          lng: {
            gte:
              Number(lng) -
              this.distanceService.convertToLng(
                Number(lat),
                distanceInKilometers,
              ),
            lte:
              Number(lng) +
              this.distanceService.convertToLng(
                Number(lat),
                distanceInKilometers,
              ),
          },
        },
        include: {
          reservations: true,
          reviews: true,
        },
      });

      return parkings;
    } catch (error) {
      throw new HttpException('Something went wrong', error.message);
    }
  }

  private getNumberOfOverlappingDates(
    startTime: Date,
    endTime: Date,
    reservations: IReservation[],
  ) {
    let collisionCount = 0;

    for (let i = 0; i < reservations.length; i++) {
      const reservation = reservations[i];

      if (
        reservation.startTime === startTime &&
        reservation.endTime === endTime
      ) {
        continue;
      }

      if (startTime < endTime && reservation.startTime < reservation.endTime) {
        collisionCount++;
      }
    }

    return collisionCount;
  }

  deleteParking(id: string) {
    throw new Error('Method not implemented.');
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateParkingDto,
  ParkingFreeSpacesDto,
  ParkingsWithinRangeDto,
} from 'src/dto/parking.dto';
import IToken from 'src/interfaces/IToken';
import IParking from 'src/interfaces/IParking';
import { DistanceService } from '../utils/distance/distance.service';
import getNumberOfOverlappingReservations from 'src/functions/getNumberOfOverlappingReservations';
import { DISTANCE_IN_KM } from 'src/constants/distance';

@Injectable()
export class ParkingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly distanceService: DistanceService,
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
    const beginTime = startTime || new Date().toISOString();
    const exitTime =
      endTime ||
      new Date(new Date().setHours(new Date().getHours() + 1)).toISOString();

    try {
      const parkings = (await this.prisma.parking.findMany({
        where: {
          lat: {
            gte:
              Number(lat) - this.distanceService.convertToLat(DISTANCE_IN_KM),
            lte:
              Number(lat) + this.distanceService.convertToLat(DISTANCE_IN_KM),
          },
          lng: {
            gte:
              Number(lng) -
              this.distanceService.convertToLng(Number(lat), DISTANCE_IN_KM),
            lte:
              Number(lng) +
              this.distanceService.convertToLng(Number(lat), DISTANCE_IN_KM),
          },
        },
        include: {
          reservations: true,
          reviews: true,
        },
      })) as unknown as IParking[];

      return this.getParkingsWithOpenSpaces(beginTime, exitTime, parkings);
    } catch (error) {
      throw new HttpException('Something went wrong', 500);
    }
  }

  async getParkingById(id: string) {
    return await this.retrieveParkingById(id, false);
  }

  async getParkingFreeSpacesWithinTimeFrame(
    id: string,
    { endTime, startTime }: ParkingFreeSpacesDto,
  ) {
    const parking = await this.retrieveParkingById(id, true);
    const takenSpaces = getNumberOfOverlappingReservations(
      startTime,
      endTime,
      parking.reservations,
    );

    return parking.parkingSize - takenSpaces;
  }

  deleteParkingById(id: string) {
    throw new Error('Method not implemented.');
  }

  async retrieveParkingById(id: string, includeReservations: boolean) {
    const parking = await this.prisma.parking.findUnique({
      where: { id },
      include: { reservations: includeReservations },
    });

    if (parking === null) {
      throw new HttpException('Could not find parking with provided id', 404);
    }

    return parking as unknown as IParking;
  }

  private getParkingsWithOpenSpaces(
    startTime: string,
    endTime: string,
    parkings: IParking[],
  ) {
    const parkingsWithSpaces: IParking[] = [];

    parkings.forEach((parking) => {
      const numberOfOverlappingReservations =
        getNumberOfOverlappingReservations(
          startTime,
          endTime,
          parking.reservations,
        );

      if (
        numberOfOverlappingReservations < parking.parkingSize &&
        parking.parkingSize >= parking.reservations.length
      ) {
        parkingsWithSpaces.push({
          ...parking,
          freeSpaces: parking.parkingSize - numberOfOverlappingReservations,
        });
      }
    });

    return parkingsWithSpaces;
  }
}

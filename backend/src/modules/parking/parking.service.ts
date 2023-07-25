/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpException, Injectable, Logger } from '@nestjs/common';
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
import { RANGE_DISTANCE } from 'src/constants/distance';

@Injectable()
export class ParkingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly distanceService: DistanceService,
  ) {}

  private readonly logger = new Logger(ParkingService.name);

  async createParking(
    {
      address,
      description,
      hourlyPrice,
      lat,
      lng,
      parkingSize,
      title,
      parkingSpaces,
      mapZoomLevel,
    }: CreateParkingDto,
    { email }: IToken,
  ) {
    this.logger.log(`Creating parkings with title (${title})`);
    const doestParkingExist =
      (await this.prisma.parking.findFirst({
        where: { title },
      })) !== null;

    if (doestParkingExist) {
      this.logger.error(`Title already taken (${title})`);
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
        mapZoomLevel,
        // @ts-ignore
        parkingSpaces: { createMany: { data: parkingSpaces } },
        owner: { connect: { email } },
      },
    });

    this.logger.log(`Parking created`);
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
      this.logger.log('Fetching parkings within range');

      const parkingsWithingRange = await this.fetchParkingsWithinRange(
        Number(lat),
        Number(lng),
      );

      return this.getParkingsWithOpenSpaces(
        beginTime,
        exitTime,
        parkingsWithingRange,
      );
    } catch (error) {
      this.logger.error(
        `Fetching parkings withing range failed ${error.message}`,
      );
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
    this.logger.log(`Fetching free spaces of (${id})`);

    const parking = await this.retrieveParkingById(id, true);
    const { collisionCount } = getNumberOfOverlappingReservations(
      startTime,
      endTime,
      parking.reservations,
    );

    return parking.parkingSize - collisionCount;
  }

  deleteParkingById(id: string) {
    throw new Error('Method not implemented.');
  }

  async retrieveParkingById(id: string, includeReservations: boolean) {
    this.logger.log(`Fetching parking with id (${id})`);

    const parking = await this.prisma.parking.findUnique({
      where: { id },
      include: { reservations: includeReservations },
    });

    if (parking === null) {
      this.logger.error(`Could not find parking with id (${id})`);
      throw new HttpException('Could not find parking with provided id', 404);
    }

    return parking as unknown as IParking;
  }

  async retrieveParkingSpaceById(id: string) {
    this.logger.log(`Fetching parking space with id (${id})`);

    const parkingSpace = await this.prisma.parkingSpace.findUnique({
      where: { id },
    });

    if (parkingSpace === null) {
      this.logger.error(`Could not find parking space with id (${id})`);
      throw new HttpException(
        'Could not find parking space with provided id',
        404,
      );
    }

    return parkingSpace;
  }

  private getParkingsWithOpenSpaces(
    startTime: string,
    endTime: string,
    parkings: IParking[],
  ) {
    const parkingsWithSpaces: IParking[] = [];

    parkings.forEach((parking) => {
      const { collisionCount, takenParkingSpaces } =
        getNumberOfOverlappingReservations(
          startTime,
          endTime,
          parking.reservations,
        );

      if (collisionCount < parking.parkingSize) {
        const parkingSpaces = parking.parkingSpaces.map((parkingSpace) => {
          return {
            ...parkingSpace,
            isCurrentlyTaken: takenParkingSpaces.includes(parkingSpace.id),
          };
        });

        parkingsWithSpaces.push({
          ...parking,
          parkingSpaces,
          freeSpaces: parking.parkingSize - collisionCount,
        });
      }
    });

    return parkingsWithSpaces;
  }

  private async fetchParkingsWithinRange(lat: number, lng: number) {
    return (await this.prisma.parking.findMany({
      where: {
        lat: {
          gte: lat - this.distanceService.convertToLat(RANGE_DISTANCE),
          lte: lat + this.distanceService.convertToLat(RANGE_DISTANCE),
        },
        lng: {
          gte: lng - this.distanceService.convertToLng(lat, RANGE_DISTANCE),
          lte: lng + this.distanceService.convertToLng(lat, RANGE_DISTANCE),
        },
      },
      include: {
        reservations: {
          select: {
            startTime: true,
            endTime: true,
            parkingSpaceId: true,
            isActive: true,
          },
        },
        reviews: true,
        parkingSpaces: true,
      },
    })) as unknown as IParking[];
  }
}

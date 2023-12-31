/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateParkingDto,
  CreateParkingReviewDto,
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

  async deleteParkingById(id: string, { email }: IToken) {
    this.logger.log(`Deleting parking by id (${id})`);
    const parking = await this.retrieveParkingById(id, { owner: true });

    if (parking.owner.email !== email) {
      this.logger.error('User not authorized to delete this parking');
      throw new HttpException(
        'Unauthorized user not the owner of parking',
        401,
      );
    }

    await this.prisma.parking.delete({ where: { id } });
    this.logger.log(`Parking with id (${id}) deleted`);

    return { message: 'Parking deleted' };
  }

  async updateParking(
    id: string,
    updateParkingDto: CreateParkingDto,
    { email }: IToken,
  ) {
    const currentParking = await this.retrieveParkingById(id, {
      reviews: true,
    });
    if (currentParking.title !== updateParkingDto.title) {
      await this.checkExistingParkingTitle(updateParkingDto.title);
    }

    const { parkingSpaces, ...parkingData } = updateParkingDto;
    await this.prisma.parking.delete({ where: { id } });

    const updatedParking = (await this.prisma.parking.create({
      data: {
        ...parkingData,
        id: currentParking.id,
        // @ts-ignore
        parkingSpaces: { createMany: { data: parkingSpaces } },
        owner: { connect: { email } },
      },
    })) as unknown as IParking;

    return await this.generateParkingMutateResponse(updatedParking, 'update');
  }

  async createParking(createParkingDto: CreateParkingDto, { email }: IToken) {
    await this.checkExistingParkingTitle(createParkingDto.title);
    const { parkingSpaces, ...parkingData } = createParkingDto;
    const parking = (await this.prisma.parking.create({
      data: {
        ...parkingData,
        // @ts-ignore
        parkingSpaces: { createMany: { data: parkingSpaces } },
        owner: { connect: { email } },
      },
    })) as unknown as IParking;

    return await this.generateParkingMutateResponse(parking, 'create');
  }

  private async generateParkingMutateResponse(
    parking: IParking,
    mutationType: 'create' | 'update',
  ) {
    this.logger.log(
      `${
        mutationType === 'create' ? 'Creating' : 'Updating'
      } parkings with title (${parking.title})`,
    );

    const mutationVerb = mutationType === 'create' ? 'created' : 'updated';

    this.logger.log(`Parking ${mutationVerb}`);
    return {
      message: `Parking ${mutationVerb} successfully`,
      parking,
    };
  }

  private async checkExistingParkingTitle(title: string) {
    const doestParkingExist =
      (await this.prisma.parking.findFirst({
        where: { title },
      })) !== null;

    if (doestParkingExist) {
      this.logger.error(`Title already taken (${title})`);
      throw new HttpException('Title is already taken', 409);
    }
  }

  async getParkingsWithinRange(
    { endTime, lat, lng, startTime }: ParkingsWithinRangeDto,
    { email }: IToken,
  ) {
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

      const updatedParkingsWithEditBool = parkingsWithingRange.map(
        (parking) => {
          return {
            ...parking,
            canUserEdit: parking.owner.email === email,
          };
        },
      );

      return this.getParkingsWithOpenSpaces(
        beginTime,
        exitTime,
        updatedParkingsWithEditBool,
      );
    } catch (error) {
      this.logger.error(
        `Fetching parkings withing range failed ${error.message}`,
      );
      throw new HttpException('Something went wrong', 500);
    }
  }

  async getParkingById(id: string) {
    return await this.retrieveParkingById(id);
  }

  async getParkingFreeSpacesWithinTimeFrame(
    id: string,
    { endTime, startTime }: ParkingFreeSpacesDto,
  ) {
    this.logger.log(`Fetching free spaces of (${id})`);

    const parking = await this.retrieveParkingById(id, { reservations: true });
    const { collisionCount } = getNumberOfOverlappingReservations(
      startTime,
      endTime,
      parking.reservations,
    );

    return parking.parkingSize - collisionCount;
  }

  async retrieveParkingById(id: string, includedAttributes?: object) {
    this.logger.log(`Fetching parking with id (${id})`);

    const parking = await this.prisma.parking.findUnique({
      where: { id },
      include: includedAttributes,
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

  async createParkingReview(
    id: string,
    { comment, rating }: CreateParkingReviewDto,
    { email }: IToken,
  ) {
    this.logger.log(`Creating parking review for parking with id (${id})`);
    await this.retrieveParkingById(id);

    const newReview = await this.prisma.review.create({
      data: {
        comment,
        rating,
        user: { connect: { email } },
        parking: { connect: { id } },
      },
    });

    this.logger.log('Review created');
    return {
      message: 'Review created successfully',
      review: newReview,
    };
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
        owner: {
          select: { email: true },
        },
      },
    })) as unknown as IParking[];
  }
}

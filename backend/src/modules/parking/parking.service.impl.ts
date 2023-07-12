import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ParkingService } from './parking.service';
import { CreateParkingDto } from 'src/dto/parking.dto';
import IToken from 'src/interfaces/IToken';

@Injectable()
export class ParkingServiceImpl implements ParkingService {
  constructor(private readonly prisma: PrismaService) {}

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

  getParkingsWithinRange(lat: number, lng: number) {
    throw new Error('Method not implemented.');
  }

  deleteParking(id: string) {
    throw new Error('Method not implemented.');
  }
}

import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateParkingDto } from 'src/dto/parking.dto';
import IToken from 'src/interfaces/IToken';
import { RequestData } from 'src/decorators/requestData.decorator';

@Controller('/parkings')
@ApiTags('Parkings')
export class ParkingController {
  constructor(
    @Inject(ParkingService) private readonly parkingService: ParkingService,
  ) {}

  @Post()
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Create parking' })
  @ApiResponse({ status: 201, description: 'Parking created' })
  @ApiResponse({ status: 400, description: 'Invalid/missing fields' })
  @ApiResponse({ status: 409, description: 'Title already taken' })
  @ApiResponse({ status: 400, description: 'Invalid or missing fields' })
  @UsePipes(ValidationPipe)
  createUser(
    @Body()
    createParkingDto: CreateParkingDto,
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.parkingService.createParking(createParkingDto, tokenData);
  }

  @Get()
  @ApiOperation({ summary: 'Get parkings within range' })
  @ApiResponse({ status: 200, description: 'Receive user data' })
  @ApiResponse({ status: 400, description: 'Invalid params' })
  getCurrentUser(@Query('lat') lat: number, @Query('lng') lng: number) {
    return this.parkingService.getParkingsWithinRange(lat, lng);
  }
}

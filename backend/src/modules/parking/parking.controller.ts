import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateParkingDto, ParkingsWithinRangeDto } from 'src/dto/parking.dto';
import IToken from 'src/interfaces/IToken';
import { RequestData } from 'src/decorators/requestData.decorator';
import { ParkingService } from './parking.service';

@Controller('/parkings')
@ApiTags('Parkings')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Post()
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Create parking' })
  @ApiResponse({ status: 201, description: 'Parking created' })
  @ApiResponse({ status: 400, description: 'Invalid/missing fields' })
  @ApiResponse({ status: 409, description: 'Title already taken' })
  @ApiResponse({ status: 400, description: 'Invalid or missing fields' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  @UsePipes(ValidationPipe)
  createParking(
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
  @UsePipes(ValidationPipe)
  getParkingsWithinRange(
    @Query()
    query: ParkingsWithinRangeDto,
  ) {
    return this.parkingService.getParkingsWithinRange(query);
  }
}

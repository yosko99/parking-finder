import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateParkingDto,
  CreateParkingReviewDto,
  ParkingFreeSpacesDto,
  ParkingsWithinRangeDto,
} from 'src/dto/parking.dto';
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

  @Post('/:id/reviews')
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Add a review to parking' })
  @ApiResponse({ status: 201, description: 'Review created' })
  @ApiResponse({ status: 400, description: 'Invalid/missing fields' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  @UsePipes(ValidationPipe)
  createParkingReview(
    @Body()
    createParkingReviewDto: CreateParkingReviewDto,
    @RequestData('userDataFromToken') tokenData: IToken,
    @Param('id') id: string,
  ) {
    return this.parkingService.createParkingReview(
      id,
      createParkingReviewDto,
      tokenData,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get parkings within range' })
  @ApiResponse({
    status: 200,
    description: 'Receive parkings with free spaces within range',
  })
  @ApiResponse({ status: 400, description: 'Invalid params' })
  @UsePipes(ValidationPipe)
  getParkingsWithinRange(
    @Query()
    query: ParkingsWithinRangeDto,
  ) {
    return this.parkingService.getParkingsWithinRange(query);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get parking by id' })
  @ApiResponse({ status: 200, description: 'Receive parking data' })
  @ApiResponse({ status: 404, description: 'Parking not found' })
  getParkingById(@Param('id') id: string) {
    return this.parkingService.getParkingById(id);
  }

  @Get('/:id/free-spaces')
  @ApiOperation({ summary: 'Get parking free spaces' })
  @ApiResponse({
    status: 200,
    description: 'Receive number parking free spaces',
  })
  @ApiResponse({ status: 400, description: 'Invalid or missing fields' })
  @ApiResponse({ status: 404, description: 'Parking not found' })
  @UsePipes(ValidationPipe)
  getParkingFreeSpacesWithinTimeFrame(
    @Param('id') id: string,
    @Query() dto: ParkingFreeSpacesDto,
  ) {
    return this.parkingService.getParkingFreeSpacesWithinTimeFrame(id, dto);
  }
}

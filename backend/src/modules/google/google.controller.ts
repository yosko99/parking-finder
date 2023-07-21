import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoogleService } from './google.service';
import { GeocodeDto, ReverseGeocodeDto } from 'src/dto/google.dto';

@Controller('/google')
@ApiTags('Google API')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('/geocode')
  @ApiOperation({ summary: 'Get geocode by address' })
  @ApiResponse({ status: 200, description: 'Fetch geocode information' })
  @ApiResponse({ status: 400, description: 'Invalid params' })
  @UsePipes(ValidationPipe)
  getGeocode(@Query() geocodeDto: GeocodeDto) {
    return this.googleService.getGeocode(geocodeDto);
  }

  @Get('/reverse-geocode')
  @ApiOperation({ summary: 'Get reverse geocode by lat and lng' })
  @ApiResponse({
    status: 200,
    description: 'Fetch reversed geocode information',
  })
  @ApiResponse({ status: 400, description: 'Invalid params' })
  @UsePipes(ValidationPipe)
  getReserveGeocode(@Query() reverseGeocodeDto: ReverseGeocodeDto) {
    return this.googleService.getReserveGeocode(reverseGeocodeDto);
  }
}

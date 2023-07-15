import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReservationDto } from 'src/dto/reservation.dto';
import { RequestData } from 'src/decorators/requestData.decorator';
import IToken from 'src/interfaces/IToken';
import { ReservationService } from './reservation.service';

@Controller('/reservations')
@ApiTags('Reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Create reservation' })
  @ApiResponse({ status: 201, description: 'Reservation created' })
  @ApiResponse({ status: 400, description: 'Invalid/missing fields' })
  @ApiResponse({ status: 404, description: 'Parking not found' })
  @ApiResponse({ status: 401, description: 'Token not provided' })
  @ApiResponse({ status: 498, description: 'Provided invalid token' })
  @ApiResponse({ status: 503, description: 'Full capacity' })
  @UsePipes(ValidationPipe)
  createReservation(
    @Body()
    createReservationDto: CreateReservationDto,
    @RequestData('userDataFromToken') tokenData: IToken,
  ) {
    return this.reservationService.createReservation(
      createReservationDto,
      tokenData,
    );
  }
}

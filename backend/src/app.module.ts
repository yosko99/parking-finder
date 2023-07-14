import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { GlobalExceptionFilter } from './filters/globalException.filter';
import { ParkingModule } from './modules/parking/parking.module';
import { ReservationModule } from './modules/reservation/reservation.module';

@Module({
  imports: [UserModule, ParkingModule, ReservationModule],
  controllers: [],
  providers: [GlobalExceptionFilter],
})
export class AppModule {}

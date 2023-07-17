import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { GlobalExceptionFilter } from './filters/globalException.filter';
import { ParkingModule } from './modules/parking/parking.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { TaskModule } from './modules/tasks/task.module';

@Module({
  imports: [UserModule, ParkingModule, ReservationModule, TaskModule],
  controllers: [],
  providers: [GlobalExceptionFilter],
})
export class AppModule {}

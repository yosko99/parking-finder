import { Module } from '@nestjs/common';
import { UserModule } from './modules/prisma/user/user.module';
import { GlobalExceptionFilter } from './filters/globalException.filter';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [GlobalExceptionFilter],
})
export class AppModule {}

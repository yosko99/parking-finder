import { ScheduleModule } from '@nestjs/schedule';
import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { TaskService } from './task.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TaskService, PrismaService],
})
export class TaskModule {}

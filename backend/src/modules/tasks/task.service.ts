import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(TaskService.name);

  async cleanOldReservations() {
    const currentDate = new Date();

    try {
      const reservations = await this.prisma.reservation.findMany({});
      let deletedReservations = 0;

      for (const reservation of reservations) {
        if (new Date(reservation.endTime) < currentDate) {
          await this.prisma.reservation.delete({
            where: {
              id: reservation.id,
            },
          });
          deletedReservations++;
        }
      }

      this.logger.log(`Deleted ${deletedReservations} expired reservations.`);
    } catch (error) {
      this.logger.error('Error deleting expired reservations:', error);
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    await this.cleanOldReservations();
    this.logger.log('Old reservations cleared up');
  }
}

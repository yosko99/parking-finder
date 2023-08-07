import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(TaskService.name);

  async deactivateOldReservations() {
    const currentDate = new Date();

    try {
      const reservations = await this.prisma.reservation.findMany({});
      let deactivatedReservations = 0;

      for (const reservation of reservations) {
        if (
          new Date(reservation.endTime) < currentDate &&
          reservation.isActive
        ) {
          await this.prisma.reservation.update({
            where: {
              id: reservation.id,
            },
            data: {
              isActive: false,
            },
          });
          deactivatedReservations++;
        }
      }

      this.logger.log(
        `Deactivated ${deactivatedReservations} expired reservations.`,
      );
    } catch (error) {
      this.logger.error('Error updating expired reservations:', error);
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    await this.deactivateOldReservations();
    this.logger.log('Old reservations deactivated');
  }
}

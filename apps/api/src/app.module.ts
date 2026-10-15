import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HealthController } from './health.controller';

@Module({
  imports: [PrismaModule, ShipmentsModule, DashboardModule],
  controllers: [HealthController],
})
export class AppModule {}

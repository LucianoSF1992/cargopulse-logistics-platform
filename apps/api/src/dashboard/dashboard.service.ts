import { Injectable } from '@nestjs/common';
import { ShipmentStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async summary() {
    const [total, inTransit, delivered, delayed, exceptions, pending] = await Promise.all([
      this.prisma.shipment.count(),
      this.prisma.shipment.count({ where: { status: ShipmentStatus.IN_TRANSIT } }),
      this.prisma.shipment.count({ where: { status: ShipmentStatus.DELIVERED } }),
      this.prisma.shipment.count({ where: { status: ShipmentStatus.DELAYED } }),
      this.prisma.shipment.count({ where: { status: ShipmentStatus.EXCEPTION } }),
      this.prisma.shipment.count({ where: { status: ShipmentStatus.PENDING } }),
    ]);
    return { total, inTransit, delivered, delayed, exceptions, pending };
  }
}

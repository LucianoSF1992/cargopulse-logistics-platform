import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, ShipmentPriority, ShipmentStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';

@Injectable()
export class ShipmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: { search?: string; status?: ShipmentStatus; priority?: ShipmentPriority }) {
    const where: Prisma.ShipmentWhereInput = {
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.priority ? { priority: filters.priority } : {}),
      ...(filters.search ? {
        OR: [
          { trackingCode: { contains: filters.search, mode: 'insensitive' } },
          { recipient: { contains: filters.search, mode: 'insensitive' } },
          { originCity: { contains: filters.search, mode: 'insensitive' } },
          { destinationCity: { contains: filters.search, mode: 'insensitive' } },
        ],
      } : {}),
    };
    return this.prisma.shipment.findMany({
      where, include: { events: { orderBy: { occurredAt: 'desc' } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id }, include: { events: { orderBy: { occurredAt: 'desc' } } },
    });
    if (!shipment) throw new NotFoundException(`Shipment '${id}' was not found`);
    return shipment;
  }

  async create(dto: CreateShipmentDto) {
    try {
      return await this.prisma.shipment.create({
        data: {
          ...dto,
          estimatedDelivery: new Date(dto.estimatedDelivery),
          events: { create: { description: 'Remessa criada', location: dto.originCity } },
        },
        include: { events: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Tracking code already exists');
      }
      throw error;
    }
  }

  async updateStatus(id: string, status: ShipmentStatus) {
    const current = await this.prisma.shipment.findUnique({ where: { id } });
    if (!current) throw new NotFoundException(`Shipment '${id}' was not found`);
    return this.prisma.shipment.update({
      where: { id },
      data: {
        status,
        events: { create: { description: `Status atualizado para ${status}`, location: current.destinationCity } },
      },
      include: { events: { orderBy: { occurredAt: 'desc' } } },
    });
  }
}

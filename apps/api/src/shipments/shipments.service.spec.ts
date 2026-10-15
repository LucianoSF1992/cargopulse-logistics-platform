import { NotFoundException } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';

describe('ShipmentsService', () => {
  const prisma = {
    shipment: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };
  let service: ShipmentsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ShipmentsService(prisma as any);
  });

  it('returns shipments using the provided filters', async () => {
    prisma.shipment.findMany.mockResolvedValue([]);
    await service.findAll({ search: 'Vitória' });
    expect(prisma.shipment.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        OR: expect.arrayContaining([expect.objectContaining({ originCity: expect.any(Object) })]),
      }),
    }));
  });

  it('throws when the requested shipment does not exist', async () => {
    prisma.shipment.findUnique.mockResolvedValue(null);
    await expect(service.findOne('missing-id')).rejects.toBeInstanceOf(NotFoundException);
  });
});

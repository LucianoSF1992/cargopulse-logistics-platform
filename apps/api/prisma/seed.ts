import { PrismaClient, ShipmentPriority, ShipmentStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const shipments = [
    { trackingCode: 'CP-2026-1001', recipient: 'Mariana Costa', originCity: 'Vitória', destinationCity: 'Belo Horizonte', status: ShipmentStatus.IN_TRANSIT, priority: ShipmentPriority.EXPRESS, estimatedDelivery: new Date('2026-10-18T15:00:00Z') },
    { trackingCode: 'CP-2026-1002', recipient: 'Rafael Almeida', originCity: 'Serra', destinationCity: 'Rio de Janeiro', status: ShipmentStatus.DELIVERED, priority: ShipmentPriority.STANDARD, estimatedDelivery: new Date('2026-10-12T16:00:00Z') },
    { trackingCode: 'CP-2026-1003', recipient: 'Camila Rocha', originCity: 'São Paulo', destinationCity: 'Vitória', status: ShipmentStatus.DELAYED, priority: ShipmentPriority.URGENT, estimatedDelivery: new Date('2026-10-14T12:00:00Z') },
    { trackingCode: 'CP-2026-1004', recipient: 'Pedro Martins', originCity: 'Curitiba', destinationCity: 'São Paulo', status: ShipmentStatus.PENDING, priority: ShipmentPriority.STANDARD, estimatedDelivery: new Date('2026-10-20T17:00:00Z') },
    { trackingCode: 'CP-2026-1005', recipient: 'Bianca Oliveira', originCity: 'Belo Horizonte', destinationCity: 'Salvador', status: ShipmentStatus.EXCEPTION, priority: ShipmentPriority.EXPRESS, estimatedDelivery: new Date('2026-10-13T13:00:00Z') },
    { trackingCode: 'CP-2026-1006', recipient: 'Lucas Ferreira', originCity: 'Rio de Janeiro', destinationCity: 'Vitória', status: ShipmentStatus.IN_TRANSIT, priority: ShipmentPriority.STANDARD, estimatedDelivery: new Date('2026-10-19T14:00:00Z') }
  ];

  for (const data of shipments) {
    const shipment = await prisma.shipment.upsert({
      where: { trackingCode: data.trackingCode },
      update: data,
      create: data
    });
    const existing = await prisma.trackingEvent.count({ where: { shipmentId: shipment.id } });
    if (!existing) {
      await prisma.trackingEvent.createMany({
        data: [
          { shipmentId: shipment.id, description: 'Remessa registrada no sistema', location: data.originCity },
          { shipmentId: shipment.id, description: 'Atualização operacional recebida', location: data.originCity }
        ]
      });
    }
  }
}

main().finally(() => prisma.$disconnect());

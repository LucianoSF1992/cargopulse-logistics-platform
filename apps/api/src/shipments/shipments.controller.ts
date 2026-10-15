import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ShipmentPriority, ShipmentStatus } from '@prisma/client';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ShipmentsService } from './shipments.service';

@ApiTags('shipments')
@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Get()
  @ApiOperation({ summary: 'List shipments with optional filters' })
  list(
    @Query('search') search?: string,
    @Query('status') status?: ShipmentStatus,
    @Query('priority') priority?: ShipmentPriority,
  ) {
    return this.shipmentsService.findAll({ search, status, priority });
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.shipmentsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateShipmentDto) {
    return this.shipmentsService.create(dto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.shipmentsService.updateStatus(id, dto.status);
  }
}

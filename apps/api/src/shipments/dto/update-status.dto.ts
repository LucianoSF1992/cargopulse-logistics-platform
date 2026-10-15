import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ShipmentStatus } from '@prisma/client';

export class UpdateStatusDto {
  @ApiProperty({ enum: ShipmentStatus })
  @IsEnum(ShipmentStatus)
  status!: ShipmentStatus;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ShipmentPriority, ShipmentStatus } from '@prisma/client';

export class CreateShipmentDto {
  @ApiProperty({ example: 'CP-2026-1007' })
  @IsString() @IsNotEmpty() @MaxLength(40)
  trackingCode!: string;

  @ApiProperty({ example: 'Mariana Costa' })
  @IsString() @IsNotEmpty() @MaxLength(120)
  recipient!: string;

  @ApiProperty({ example: 'Vitória' })
  @IsString() @IsNotEmpty() @MaxLength(100)
  originCity!: string;

  @ApiProperty({ example: 'Belo Horizonte' })
  @IsString() @IsNotEmpty() @MaxLength(100)
  destinationCity!: string;

  @ApiProperty({ enum: ShipmentStatus, default: ShipmentStatus.PENDING })
  @IsEnum(ShipmentStatus)
  status!: ShipmentStatus;

  @ApiProperty({ enum: ShipmentPriority, default: ShipmentPriority.STANDARD })
  @IsEnum(ShipmentPriority)
  priority!: ShipmentPriority;

  @ApiProperty({ example: '2026-10-18T15:00:00.000Z' })
  @IsDateString()
  estimatedDelivery!: string;
}

import { Module } from '@nestjs/common';
import { VentasReservasController } from './ventas-reservas.controller';
import { VentasReservasService } from './ventas-reservas.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VentasReservasController],
  providers: [VentasReservasService, PrismaService]
})
export class VentasReservasModule {}

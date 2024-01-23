import { Module } from '@nestjs/common';
import { VentasFormasPagoController } from './ventas-formas-pago.controller';
import { VentasFormasPagoService } from './ventas-formas-pago.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VentasFormasPagoController],
  providers: [VentasFormasPagoService, PrismaService]
})
export class VentasFormasPagoModule {}

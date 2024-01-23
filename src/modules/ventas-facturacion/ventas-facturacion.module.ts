import { Module } from '@nestjs/common';
import { VentasFacturacionController } from './ventas-facturacion.controller';
import { VentasFacturacionService } from './ventas-facturacion.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VentasFacturacionController],
  providers: [VentasFacturacionService, PrismaService]
})
export class VentasFacturacionModule {}

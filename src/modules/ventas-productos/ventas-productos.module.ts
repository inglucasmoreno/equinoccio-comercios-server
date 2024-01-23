import { Module } from '@nestjs/common';
import { VentasProductosController } from './ventas-productos.controller';
import { VentasProductosService } from './ventas-productos.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VentasProductosController],
  providers: [VentasProductosService, PrismaService]
})
export class VentasProductosModule {}

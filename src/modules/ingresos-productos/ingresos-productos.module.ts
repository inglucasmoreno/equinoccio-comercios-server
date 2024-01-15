import { Module } from '@nestjs/common';
import { IngresosProductosController } from './ingresos-productos.controller';
import { IngresosProductosService } from './ingresos-productos.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [IngresosProductosController],
  providers: [IngresosProductosService, PrismaService]
})
export class IngresosProductosModule {}

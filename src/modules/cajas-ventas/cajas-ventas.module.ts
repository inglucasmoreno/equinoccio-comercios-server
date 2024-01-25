import { Module } from '@nestjs/common';
import { CajasVentasController } from './cajas-ventas.controller';
import { CajasVentasService } from './cajas-ventas.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CajasVentasController],
  providers: [CajasVentasService, PrismaService]
})
export class CajasVentasModule {}

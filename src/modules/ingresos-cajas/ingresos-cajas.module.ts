import { Module } from '@nestjs/common';
import { IngresosCajasController } from './ingresos-cajas.controller';
import { IngresosCajasService } from './ingresos-cajas.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [IngresosCajasController],
  providers: [IngresosCajasService, PrismaService]
})
export class IngresosCajasModule {}

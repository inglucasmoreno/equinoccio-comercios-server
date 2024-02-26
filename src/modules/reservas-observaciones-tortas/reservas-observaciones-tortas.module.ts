import { Module } from '@nestjs/common';
import { ReservasObservacionesTortasController } from './reservas-observaciones-tortas.controller';
import { ReservasObservacionesTortasService } from './reservas-observaciones-tortas.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ReservasObservacionesTortasController],
  providers: [ReservasObservacionesTortasService, PrismaService]
})
export class ReservasObservacionesTortasModule {}

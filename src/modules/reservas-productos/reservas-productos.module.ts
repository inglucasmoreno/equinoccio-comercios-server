import { Module } from '@nestjs/common';
import { ReservasProductosController } from './reservas-productos.controller';
import { ReservasProductosService } from './reservas-productos.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ReservasProductosController],
  providers: [ReservasProductosService, PrismaService]
})
export class ReservasProductosModule {}

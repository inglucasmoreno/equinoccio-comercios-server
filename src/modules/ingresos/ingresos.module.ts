import { Module } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { IngresosController } from './ingresos.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [IngresosService, PrismaService],
  controllers: [IngresosController]
})
export class IngresosModule {}

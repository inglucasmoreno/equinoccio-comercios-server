import { Module } from '@nestjs/common';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VentasController],
  providers: [VentasService, PrismaService]
})
export class VentasModule {}

import { Module } from '@nestjs/common';
import { GastosCajasController } from './gastos-cajas.controller';
import { GastosCajasService } from './gastos-cajas.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GastosCajasController],
  providers: [GastosCajasService, PrismaService]
})
export class GastosCajasModule {}

import { Module } from '@nestjs/common';
import { CajasController } from './cajas.controller';
import { CajasService } from './cajas.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CajasController],
  providers: [CajasService, PrismaService]
})
export class CajasModule {}

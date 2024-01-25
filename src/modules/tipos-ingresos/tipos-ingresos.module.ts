import { Module } from '@nestjs/common';
import { TiposIngresosController } from './tipos-ingresos.controller';
import { TiposIngresosService } from './tipos-ingresos.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TiposIngresosController],
  providers: [TiposIngresosService, PrismaService]
})
export class TiposIngresosModule {}

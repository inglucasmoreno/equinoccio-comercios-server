import { Module } from '@nestjs/common';
import { TiposGastosController } from './tipos-gastos.controller';
import { TiposGastosService } from './tipos-gastos.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TiposGastosController],
  providers: [TiposGastosService, PrismaService]
})
export class TiposGastosModule {}

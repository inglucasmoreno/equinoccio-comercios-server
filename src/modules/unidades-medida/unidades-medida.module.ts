import { Module } from '@nestjs/common';
import { UnidadesMedidaController } from './unidades-medida.controller';
import { UnidadesMedidaService } from './unidades-medida.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UnidadesMedidaController],
  providers: [UnidadesMedidaService, PrismaService]
})
export class UnidadesMedidaModule {}

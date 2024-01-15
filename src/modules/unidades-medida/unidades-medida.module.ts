import { Module } from '@nestjs/common';
import { UnidadesMedidaController } from './unidades-medida.controller';
import { UnidadesMedidaService } from './unidades-medida.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UnidadesMedidaController],
  providers: [
    UnidadesMedidaService, 
    PrismaService,
    JwtService
  ]
})
export class UnidadesMedidaModule {}

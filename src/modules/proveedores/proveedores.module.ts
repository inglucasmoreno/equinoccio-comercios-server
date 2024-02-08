import { Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [ProveedoresService, PrismaService],
  controllers: [ProveedoresController]
})
export class ProveedoresModule {}

import { Module } from '@nestjs/common';
import { UsuariosPermisosService } from './usuarios-permisos.service';
import { UsuariosPermisosController } from './usuarios-permisos.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UsuariosPermisosService, PrismaService],
  controllers: [UsuariosPermisosController]
})
export class UsuariosPermisosModule {}

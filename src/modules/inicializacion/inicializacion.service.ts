import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class InicializacionService {

  constructor(private prisma: PrismaService) { }

  async inicializacion(): Promise<any> {

    // 1) - Verificacion
    const verificacion = await this.prisma.usuarios.findMany();
    if (verificacion.length != 0) throw new NotFoundException('El sistema ya fue inicializado');

    // 2) - Se crea usuario administrador
    const data: any = {
      usuario: 'admin',
      apellido: 'ADMIN',
      nombre: 'ADMIN',
      dni: '34060390',
      email: 'admin@gmail.com',
      role: 'ADMIN_ROLE',
      activo: true
    }

    // Generacion de password encriptado
    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync('admin', salt);

    // Se crea y se almacena en la base de datos al usuario administrador    
    const usuarioDB = await this.prisma.usuarios.create({ data })

    // Inicializacion de unidades especiales - UNIDAD y KILOGRAMO
    await this.prisma.unidadesMedida.create({
      data: {
        id: 1,
        descripcion: 'UNIDAD',
        creatorUserId: usuarioDB.id
      }
    });

    await this.prisma.unidadesMedida.create({
      data: {
        id: 2,
        descripcion: 'KILOGRAMO',
        creatorUserId: usuarioDB.id
      }
    });

    // Inicializacion de configuraciones generales
    await this.prisma.configGenerales.create({
      data: {
        formatoBalanza: 'iipppppeeeeef',
        creatorUserId: usuarioDB.id
      }
    });

    return 'Inicializacion correcta';

  }

}

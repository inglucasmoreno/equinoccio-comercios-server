import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, UsuariosPermisos } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsuariosPermisosService {

  constructor(private prisma: PrismaService) { }

  // Permiso por ID
  async getId(id: number): Promise<UsuariosPermisos> {

    const permiso = await this.prisma.usuariosPermisos.findFirst({
      where: { id },
    })

    if (!permiso) throw new NotFoundException('El permiso no existe');
    return permiso;

  }

  // Listar permisos
  async getAll({
    columna = 'createdAt',
    direccion = 'desc',
    activo = '',
    parametro = '',
    usuario = '',
    pagina = 1,
    itemsPorPagina = 10000
  }: any): Promise<any> {

    // Ordenando datos
    let orderBy = {};
    orderBy[columna] = direccion;

    let where: any = {};

    if(usuario) where.usuarioId = Number(usuario);  

    // where.OR.push({
    //   descripcion: {
    //     contains: parametro.toUpperCase()
    //   }
    // })

    // Total de permisos
    const totalItems = await this.prisma.usuariosPermisos.count({ where });

    // Listado de permisos
    const permisos = await this.prisma.usuariosPermisos.findMany({
      take: Number(itemsPorPagina),
      // skip: (pagina - 1) * itemsPorPagina,
      orderBy,
      where
    })

    return {
      permisos,
      totalItems,
    };

  }

  // Crear permiso
  async insert(createData: Prisma.UsuariosPermisosCreateInput): Promise<UsuariosPermisos> {
    return await this.prisma.usuariosPermisos.create({ data: createData });
  }

  // Actualizar permiso
  async update(id: number, updateData: Prisma.UsuariosPermisosUpdateInput): Promise<UsuariosPermisos> {

    const permisoDB = await this.prisma.usuariosPermisos.findFirst({ where: { id } });

    // Verificacion: El permiso no existe
    if (!permisoDB) throw new NotFoundException('El permiso no existe');

    return await this.prisma.usuariosPermisos.update({
      where: { id },
      data: updateData,
    })

  }


}

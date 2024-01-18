import { Injectable, NotFoundException } from '@nestjs/common';
import { IngresosProductos, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IngresosProductosService {

  constructor(private prisma: PrismaService) { }

  // Relacion por ID
  async getId(id: number): Promise<IngresosProductos> {

    const relacion = await this.prisma.ingresosProductos.findFirst({
      where: { id },
      include: {
        producto: {
          include: {
            unidadMedida: true,
          }
        },
        ingreso: true,
        creatorUser: true,
      }
    })

    if (!relacion) throw new NotFoundException('La relacion no existe');
    return relacion;

  }

  // Listar relaciones
  async getAll({
    columna = 'id',
    direccion = 'desc',
    activo = '',
    parametro = '',
    pagina = 1,
    itemsPorPagina = 10000
  }: any): Promise<any> {

    // Ordenando datos
    let orderBy = {};
    orderBy[columna] = direccion;

    let where = {};

    if (activo) where = { activo: activo === 'true' ? true : false };

    // where.OR.push({
    //   descripcion: {
    //     contains: parametro.toUpperCase()
    //   }
    // })

    // Total de items
    const totalItems = await this.prisma.ingresosProductos.count({ where });

    // Listado de relaciones
    const relaciones = await this.prisma.ingresosProductos.findMany({
      take: Number(itemsPorPagina),
      include: {
        producto: true,
        ingreso: true,
        creatorUser: true,
      },
      // skip: (pagina - 1) * itemsPorPagina,
      // orderBy,
      where
    })

    return {
      relaciones,
      totalItems,
    };

  }

  // Crear relacion
  async insert(createData: any): Promise<IngresosProductos> {

    // Verificacion: El producto ya se encuentra en el ingreso
    const relacionDB = await this.prisma.ingresosProductos.findFirst({
      where: {
        ingresoId: createData.ingresoId,
        productoId: createData.productoId
      }
    });

    if (relacionDB) throw new NotFoundException('El producto ya se encuentra en el ingreso');

    return await this.prisma.ingresosProductos.create({
      data: createData,
      include: {
        producto: {
          include: {
            unidadMedida: true,
          }
        },
        ingreso: true,
        creatorUser: true
      }
    });
  }

  // Actualizar relacion
  async update(id: number, updateData: Prisma.IngresosProductosUpdateInput): Promise<IngresosProductos> {

    const relacionDB = await this.prisma.ingresosProductos.findFirst({ where: { id } });

    // Verificacion: El ingreso no existe
    if (!relacionDB) throw new NotFoundException('La relacion no existe');

    return await this.prisma.ingresosProductos.update({
      where: { id },
      data: updateData,
      include: {
        producto: true,
        ingreso: true,
        creatorUser: true
      }
    })
  }

  // Eliminar relacion
  async delete(id: number): Promise<String> {

    // Verificar si existe la relacion
    const relacionDB = await this.prisma.ingresosProductos.findFirst({ where: { id } });
    if (!relacionDB) throw new NotFoundException('El producto no existe');

    // Eliminar relacion por ID
    await this.prisma.ingresosProductos.delete({ where: { id } });

    return 'Producto eliminado correctamente';
  }

}

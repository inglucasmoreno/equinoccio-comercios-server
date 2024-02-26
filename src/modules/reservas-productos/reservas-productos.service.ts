import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, ReservasProductos } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReservasProductosService {

  constructor(private prisma: PrismaService) { }

  // ReservaProducto por ID
  async getId(id: number): Promise<ReservasProductos> {

    const reservaProducto = await this.prisma.reservasProductos.findFirst({
      where: { id },
      include: {
        reserva: true,
        producto: true,
        creatorUser: true,
      }
    })

    if (!reservaProducto) throw new NotFoundException('La reservaProducto no existe');
    return reservaProducto;

  }

  // Listar ReservasProductos
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

    let where: any = {
      activo: activo === 'true' ? true : false
    };

    // Total de reservasProductos
    const totalItems = await this.prisma.reservasProductos.count({ where });

    // Listado de reservasProductos
    const reservasProductos = await this.prisma.reservasProductos.findMany({
      take: Number(itemsPorPagina),
      include: {
        reserva: true,
        producto: true,
        creatorUser: true,
      },
      // skip: (pagina - 1) * itemsPorPagina,
      orderBy,
      // where: {
      //   activo: false
      // }
    })

    return {
      reservasProductos,
      totalItems,
    };

  }

  // Crear reservaProducto
  async insert(createData: Prisma.ReservasProductosCreateInput): Promise<ReservasProductos> {
    return await this.prisma.reservasProductos.create({
      data: createData, include: {
        reserva: true,
        producto: true,
        creatorUser: true
      }
    });
  }

  // Actualizar reservaProducto
  async update(id: number, updateData: Prisma.ReservasProductosUpdateInput): Promise<ReservasProductos> {

    const reservaProductoDB = await this.prisma.reservasProductos.findFirst({ where: { id } });

    // Verificacion: La reservaProducto no existe
    if (!reservaProductoDB) throw new NotFoundException('La reservaProducto no existe');

    return await this.prisma.reservasProductos.update({
      where: { id },
      data: updateData,
      include: {
        reserva: true,
        producto: true,
        creatorUser: true
      }
    })

  }

}

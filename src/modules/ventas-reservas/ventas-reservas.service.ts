import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, VentasReservas } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VentasReservasService {

  constructor(private prisma: PrismaService) { }

  // VentaReserva por ID
  async getId(id: number): Promise<VentasReservas> {

    const ventaReserva = await this.prisma.ventasReservas.findFirst({
      where: { id },
      include: {
        venta: true,
        reserva: true,
        creatorUser: true,
      }
    })

    if (!ventaReserva) throw new NotFoundException('La ventaReserva no existe');
    return ventaReserva;

  }

  // Listar ventasReservas
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

    // Total de ventasReservas
    const totalItems = await this.prisma.ventasReservas.count({ where });

    // Listado de ventaReserva
    const ventasReservas = await this.prisma.ventasReservas.findMany({
      take: Number(itemsPorPagina),
      include: {
        venta: true,
        reserva: true,
        creatorUser: true,
      },
      // skip: (pagina - 1) * itemsPorPagina,
      orderBy,
      // where: {
      //   activo: false
      // }
    })

    return {
      ventasReservas,
      totalItems,
    };

  }

  // Crear ventaReserva
  async insert(createData: Prisma.VentasReservasCreateInput): Promise<VentasReservas> {
    return await this.prisma.ventasReservas.create({ data: createData, include: {
      venta: true,
      reserva: true,
      creatorUser: true 
    } });
  }

  // Actualizar ventaReserva
  async update(id: number, updateData: Prisma.VentasReservasUpdateInput): Promise<VentasReservas> {

    const ventaReservaDB = await this.prisma.ventasReservas.findFirst({ where: { id } });

    // Verificacion: La ventaReserva no existe
    if (!ventaReservaDB) throw new NotFoundException('La ventaReserva no existe');

    return await this.prisma.ventasReservas.update({
      where: { id },
      data: updateData,
      include: {
        venta: true,
        reserva: true,
        creatorUser: true
      }
    })

  }

}

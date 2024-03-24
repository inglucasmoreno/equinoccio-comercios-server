import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Reservas } from '@prisma/client';
import { add } from 'date-fns';
import { create } from 'domain';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReservasService {

  constructor(private prisma: PrismaService) { }

  // Reserva por ID
  async getId(id: number): Promise<Reservas> {

    const reserva = await this.prisma.reservas.findFirst({
      where: { id },
      include: {
        cliente: true,
        reservasProductos: {
          include: {
            producto: {
              include: {
                unidadMedida: true
              }
            }
          }
        },
        creatorUser: true,
      }
    })

    if (!reserva) throw new NotFoundException('La reserva no existe');
    return reserva;

  }

  // Listar reservas
  async getAll({
    columna = 'id',
    direccion = 'desc',
    estado = '',
    fechaDesde = '',
    fechaHasta = '',
    parametro = '',
    pagina = 1,
    itemsPorPagina = 10000
  }: any): Promise<any> {

    // Ordenando datos
    let orderBy = {};
    orderBy[columna] = direccion;

    let where: any = {};

    // Si viene el parametro debe buscar en el usuarios generador o el cliente
    if (parametro.trim() !== '') {
      where = {
        OR: [
          { usuarioCreador: { contains: parametro } },
          { cliente: { descripcion: { contains: parametro } } }
        ]
      }
    }

    if (estado.trim() !== '') where = { ...where, estado }


    // Total de reservas
    const totalItems = await this.prisma.reservas.count({ where });

    // Listado de reservas
    const reservas = await this.prisma.reservas.findMany({
      take: Number(itemsPorPagina),
      include: {
        cliente: true,
        creatorUser: true,
      },
      skip: (pagina - 1) * itemsPorPagina,
      orderBy,
      where: {
        ...where,
        fechaReserva: {
          gte: fechaDesde !== '' ? add(new Date(fechaDesde), { hours: 3 }) : new Date('1970-01-01T00:00:00.000Z'),
          lte: fechaHasta !== '' ? add(new Date(fechaHasta), { days: 1, hours: 3 }) : new Date('9000-01-01T00:00:00.000Z'),
        }
      }
    })

    return {
      reservas,
      totalItems,
    };

  }

  // Crear reserva
  async insert(createData: any): Promise<Reservas> {

    // Uppercase
    createData.usuarioCreador = createData.usuarioCreador?.toLocaleUpperCase().trim();
    createData.observaciones = createData.observaciones?.toLocaleUpperCase().trim();

    // Adaptando fechas
    createData.fechaReserva = new Date(createData.fechaReserva);
    createData.fechaReserva.setHours(createData.fechaReserva.getHours() + 3);
    createData.fechaEntrega = new Date(createData.fechaEntrega);
    createData.fechaEntrega.setHours(createData.fechaEntrega.getHours() + 3);

    // createData sin productos
    let dataReserva = { ...createData };
    delete dataReserva.productos;

    // Se crear la reserva
    const reservaDB = await this.prisma.reservas.create({
      data: dataReserva, include: {
        cliente: true,
        creatorUser: true
      }
    });

    // Productos -> Reserva
    if (createData.productos) {

      let productosAdt: any[] = []

      createData.productos.map(item => {
        productosAdt.push({
          cantidad: item.cantidad,
          productoId: item.productoId,
          precioTotal: item.precioTotal,
          precioUnitario: item.precioUnitario,
          reservaId: reservaDB.id,
          creatorUserId: createData.creatorUserId
        })
      })

      await this.prisma.reservasProductos.createMany({
        data: productosAdt
      });
    }

    return reservaDB;

  }

  // Actualizar reserva
  async update(id: number, updateData: Prisma.ReservasUpdateInput): Promise<Reservas> {

    // Uppercase
    updateData.usuarioCreador = updateData.usuarioCreador?.toString().toLocaleUpperCase().trim();
    updateData.observaciones = updateData.observaciones?.toString().toLocaleUpperCase().trim();

    // Adaptando fechas    
    updateData.fechaReserva ? updateData.fechaReserva = new Date("2024/02/24") : null;
    updateData.fechaEntrega ? updateData.fechaEntrega = new Date("2024/02/24") : null;

    const reservaDB = await this.prisma.reservas.findFirst({ where: { id } });

    // Verificacion: La reserva no existe
    if (!reservaDB) throw new NotFoundException('La reserva no existe');

    return await this.prisma.reservas.update({
      where: { id },
      data: updateData,
      include: {
        cliente: true,
        creatorUser: true
      }
    })

  }

}

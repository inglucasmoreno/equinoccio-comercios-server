import { Injectable, NotFoundException } from '@nestjs/common';
import { Ingresos, Prisma } from '@prisma/client';
import { add } from 'date-fns';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IngresosService {

  constructor(private prisma: PrismaService) { }

  // Ingreso por ID
  async getId(id: number): Promise<Ingresos> {

    const ingreso = await this.prisma.ingresos.findFirst({
      where: { id },
      include: {
        ingresosProductos: {
          include: {
            producto: {
              include: {
                unidadMedida: true
              }
            }
          }
        },
        proveedor: true,
        usuarioCompletado: true,
        creatorUser: true,
      }
    })

    if (!ingreso) throw new NotFoundException('EL ingreso no existe');
    return ingreso;

  }

  // Listar ingresos
  async getAll({
    columna = 'id',
    direccion = 'desc',
    activo = '',
    parametro = '',
    pagina = 1,
    fechaDesde = '',
    fechaHasta = '',
    estado = '',
    itemsPorPagina = 10000
  }: any): Promise<any> {

    // Ordenando datos
    let orderBy = {};
    orderBy[columna] = direccion;

    let where = {};

    if (activo) where = { activo: activo === 'true' ? true : false };

    if(estado) where = { ...where, estado };

    // Busqueda por parametro
    if (parametro !== '') {
      where = {
        ...where,
        OR: [
          { id: { equals: Number(parametro) } },
          { nroFactura: { contains: parametro } },
          { comentario: { contains: parametro } },
        ]
      }
    }

    // Total de ingresos
    const totalItems = await this.prisma.ingresos.count({ where });

    // Listado de ingresos
    const ingresos = await this.prisma.ingresos.findMany({
      take: Number(itemsPorPagina),
      include: {
        proveedor: true,
        usuarioCompletado: true,
        creatorUser: true,
      },
      skip: (pagina - 1) * itemsPorPagina,
      orderBy,
      where: {
        ...where,
        fechaIngreso: {
          gte: fechaDesde !== '' ? add(new Date(fechaDesde), { hours: 3 }) : new Date('1970-01-01T00:00:00.000Z'),
          lte: fechaHasta !== '' ? add(new Date(fechaHasta), { days: 1, hours: 3 }) : new Date('9000-01-01T00:00:00.000Z'),
        }
      }
    })

    return {
      ingresos,
      totalItems,
    };

  }

  // Crear ingreso
  async insert(createData: Prisma.IngresosCreateInput): Promise<Ingresos> {

    // Uppercase
    createData.nroFactura = createData.nroFactura?.toLocaleUpperCase().trim();
    createData.comentario = createData.comentario?.toLocaleUpperCase().trim();

    // Se le suma 3hs a la fecha de ingreso
    createData.fechaIngreso = new Date(createData.fechaIngreso);
    createData.fechaIngreso.setHours(createData.fechaIngreso.getHours() + 3);

    return await this.prisma.ingresos.create({ 
      data: createData, 
      include: {
        ingresosProductos: {
          include: {
            producto: {
              include: {
                unidadMedida: true
              }
            }
          }
        },
        proveedor: true,
        usuarioCompletado: true,
        creatorUser: true,
      }
    });

  }

  // Completar ingreso
  async completar(id: number, data: any): Promise<any> {

    const { usuarioCompletadoId } = data;

    const relaciones = await this.prisma.ingresosProductos.findMany({
      where: { ingresoId: id }
    });

    // Recorrer relaciones
    for(let relacion of relaciones) {

      // Se aumenta el stock de cada producto
      await this.prisma.productos.update({
        where: { id: relacion.productoId },
        data: {
          cantidad: {
            increment: relacion.cantidad
          }
        }
      });

      // Se actualizar el precio en caso que sea necesario
      if (relacion.actualizarPrecio) {
        await this.prisma.productos.update({
          where: { id: relacion.productoId },
          data: {
            precioCompra: relacion.precioCompra,
            precioVenta: relacion.precioVentaNuevo,
            porcentajeGanancia: relacion.porcentajeGanancia
          }
        });
      }

      // Se deshabilita la relacion
      await this.prisma.ingresosProductos.update({
        where: { id: relacion.id },
        data: { 
          activo: false 
        }
      });

    }

    // El ingreso se coloca en estado de completado
    const ingresoDB = await this.prisma.ingresos.update({
      where: { id },
      data: { 
        usuarioCompletadoId,
        estado: 'Completado' 
      }
    });

    return ingresoDB;

  }

  // Actualizar ingreso
  async update(id: number, updateData: any): Promise<Ingresos> {

    // Uppercase
    updateData.nroFactura = updateData.nroFactura?.toString().toLocaleUpperCase().trim();
    updateData.comentario = updateData.comentario?.toString().toLocaleUpperCase().trim();

    // Se le suma 3hs a la fecha de ingreso
    updateData.fechaIngreso = new Date(updateData.fechaIngreso);
    updateData.fechaIngreso.setHours(updateData.fechaIngreso.getHours() + 3);

    const ingresoDB = await this.prisma.ingresos.findFirst({ where: { id } });

    // Verificacion: El ingreso no existe
    if (!ingresoDB) throw new NotFoundException('El ingreso no existe');

    return await this.prisma.ingresos.update({
      where: { id },
      data: updateData,
      include: {
        usuarioCompletado: true,
        creatorUser: true
      }
    })

  }

}

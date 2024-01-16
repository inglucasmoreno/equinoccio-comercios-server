import { Injectable, NotFoundException } from '@nestjs/common';
import { Ingresos, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IngresosService {

  constructor(private prisma: PrismaService) { }

  // Ingreso por ID
  async getId(id: number): Promise<Ingresos> {

    const ingreso = await this.prisma.ingresos.findFirst({
      where: { id },
      include: {
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

    // Total de ingresos
    const totalItems = await this.prisma.ingresos.count({ where });

    // Listado de ingresos
    const ingresos = await this.prisma.ingresos.findMany({
      take: Number(itemsPorPagina),
      include: {
        creatorUser: true,
      },
      // skip: (pagina - 1) * itemsPorPagina,
      orderBy,
      where
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

    return await this.prisma.ingresos.create({ data: createData, include: { creatorUser: true } });

  }

  // Actualizar ingreso
  async update(id: number, updateData: any): Promise<Ingresos> {

    console.log(updateData);

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
        creatorUser: true
      }
    })

  }

}

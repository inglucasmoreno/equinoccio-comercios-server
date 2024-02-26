import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, ReservasObservacionesTortas } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReservasObservacionesTortasService {

  constructor(private prisma: PrismaService) { }

  // ObservacionTorta por ID
  async getId(id: number): Promise<ReservasObservacionesTortas> {

    const observacionTorta = await this.prisma.reservasObservacionesTortas.findFirst({
      where: { id },
      include: {
        reserva: true,
        creatorUser: true,
      }
    })

    if (!observacionTorta) throw new NotFoundException('La observacion no existe');
    return observacionTorta;

  }

  // Listar observacionesTortas
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

    // Total de observacionesTotas
    const totalItems = await this.prisma.reservasObservacionesTortas.count({ where });

    // Listado de observacionesTortas
    const observacionesTortas = await this.prisma.reservasObservacionesTortas.findMany({
      take: Number(itemsPorPagina),
      include: {
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
      observacionesTortas,
      totalItems,
    };

  }

  // Crear observacionTorta
  async insert(createData: Prisma.ReservasObservacionesTortasCreateInput): Promise<ReservasObservacionesTortas> {

    console.log(createData);

    // Uppercase
    createData.relleno1 ? createData.relleno1 = createData.relleno1?.toLocaleUpperCase().trim() : null;
    createData.relleno2 ? createData.relleno2 = createData.relleno2?.toLocaleUpperCase().trim() : null;
    createData.relleno3 ? createData.relleno3 = createData.relleno3?.toLocaleUpperCase().trim() : null;
    createData.forma ? createData.forma = createData.forma?.toLocaleUpperCase().trim() : null;
    
    return await this.prisma.reservasObservacionesTortas.create({ data: createData, include: { 
      reserva: true,
      creatorUser: true 
    } });

  }

  // Actualizar observacionTorta
  async update(id: number, updateData: Prisma.ReservasObservacionesTortasUpdateInput): Promise<ReservasObservacionesTortas> {

    // Uppercase
    updateData.relleno1 ? updateData.relleno1 = updateData.relleno1?.toString().toLocaleUpperCase().trim() : null;
    updateData.relleno2 ? updateData.relleno2 = updateData.relleno2?.toString().toLocaleUpperCase().trim() : null;
    updateData.relleno3 ? updateData.relleno3 = updateData.relleno3?.toString().toLocaleUpperCase().trim() : null;
    updateData.forma ? updateData.forma = updateData.forma?.toString().toLocaleUpperCase().trim() : null;

    const observacionTortaDB = await this.prisma.reservasObservacionesTortas.findFirst({ where: { id } });

    // Verificacion: La observacion no existe
    if (!observacionTortaDB) throw new NotFoundException('La observacion no existe');

    return await this.prisma.reservasObservacionesTortas.update({
      where: { id },
      data: updateData,
      include: {
        reserva: true,
        creatorUser: true
      }
    })

  }

}

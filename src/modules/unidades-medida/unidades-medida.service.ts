import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, UnidadesMedida } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UnidadesMedidaService {

  constructor(private prisma: PrismaService) { }

  // Unidad por ID
  async getId(id: number): Promise<UnidadesMedida> {

    const unidad = await this.prisma.unidadesMedida.findFirst({
      where: { id },
      include: {
        creatorUser: true,
      }
    })

    if (!unidad) throw new NotFoundException('La unidad no existe');
    return unidad;

  }

  // Listar unidades
  async getAll({
    columna = 'descripcion',
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

    if(activo) where = { activo: activo === 'true' ? true : false };
  
    // where.OR.push({
    //   descripcion: {
    //     contains: parametro.toUpperCase()
    //   }
    // })

    // Total de unidades
    const totalItems = await this.prisma.unidadesMedida.count({ where });

    // Listado de unidades
    const unidades = await this.prisma.unidadesMedida.findMany({
      take: Number(itemsPorPagina),
      include: {
        creatorUser: true,
      },
      // skip: (pagina - 1) * itemsPorPagina,
      // orderBy,
      where
    })

    return {
      unidades,
      totalItems,
    };

  }

  // Crear unidad
  async insert(createData: Prisma.UnidadesMedidaCreateInput): Promise<UnidadesMedida> {

    console.log(createData);

    // Uppercase
    createData.descripcion = createData.descripcion?.toLocaleUpperCase().trim();

    // Verificacion: Descripcion repetida
    let unidadDB = await this.prisma.unidadesMedida.findFirst({ where: { descripcion: createData.descripcion } });
    if (unidadDB) throw new NotFoundException('La unidad de medida ya se encuentra cargada');

    return await this.prisma.unidadesMedida.create({ data: createData, include: { creatorUser: true } });

  }

  // Actualizar unidad
  async update(id: number, updateData: Prisma.UnidadesMedidaUpdateInput): Promise<UnidadesMedida> {

    const { descripcion } = updateData;

    // Uppercase
    updateData.descripcion = updateData.descripcion?.toString().toLocaleUpperCase().trim();

    const unidadDB = await this.prisma.unidadesMedida.findFirst({ where: { id } });

    // Verificacion: La unidad no existe
    if (!unidadDB) throw new NotFoundException('La unidad no existe');

    // Verificacion: Unidad de medida repetida
    if (descripcion) {
      const unidadRepetida = await this.prisma.unidadesMedida.findFirst({ where: { descripcion: descripcion.toString() } })
      if (unidadRepetida && unidadRepetida.id !== id) throw new NotFoundException('La unidad ya se encuentra cargada');
    }

    return await this.prisma.unidadesMedida.update({
      where: { id },
      data: updateData,
      include: {
        creatorUser: true
      }
    })

  }

}

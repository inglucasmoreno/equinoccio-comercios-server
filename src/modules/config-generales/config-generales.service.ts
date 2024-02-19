import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigGenerales, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ConfigGeneralesService {

  constructor(private prisma: PrismaService) { }

  // ConfigGenerales por ID
  async getId(id: number): Promise<ConfigGenerales> {

    const configGeneral = await this.prisma.configGenerales.findFirst({
      where: { id },
      include: {
        creatorUser: true,
      }
    })

    if (!configGeneral) throw new NotFoundException('La configuracion no existe');
    return configGeneral;

  }

  // Listar configuraciones
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

    // Listado de configuraciones
    const configGeneral = await this.prisma.configGenerales.findMany({
      take: Number(itemsPorPagina),
      include: {
        creatorUser: true,
      },
      orderBy,
    })

    return {
      configGeneral,
    };

  }

  // Crear configuracion - Inicializacion
  async insert(createData: any): Promise<ConfigGenerales> {

    const { formato, creatorUserId } = createData;

    // Verificacion: La configuracion ya fue inicializada
    const configGeneralDB = await this.prisma.configGenerales.findMany({});
    if (configGeneralDB[0]) throw new NotFoundException('La configuracion ya se encuentra inicializada');

    const data = {
      formato,
      creatorUserId,
    };

    return await this.prisma.configGenerales.create({ data, include: { creatorUser: true } });
  
  }

  // Actualizar configGeneral
  async update(id: number, updateData: Prisma.ConfigGeneralesUpdateInput): Promise<ConfigGenerales> {
    return await this.prisma.configGenerales.update({
      where: { id },
      data: updateData,
      include: {
        creatorUser: true
      }
    })
  }

}

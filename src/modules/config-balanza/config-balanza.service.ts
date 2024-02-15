import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigBalanza, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ConfigBalanzaService {

  constructor(private prisma: PrismaService) { }

  // ConfiBalanza por ID
  async getId(id: number): Promise<ConfigBalanza> {

    const configBalanza = await this.prisma.configBalanza.findFirst({
      where: { id },
      include: {
        creatorUser: true,
      }
    })

    if (!configBalanza) throw new NotFoundException('La configuracion no existe');
    return configBalanza;

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
    const configBalanzas = await this.prisma.configBalanza.findMany({
      take: Number(itemsPorPagina),
      include: {
        creatorUser: true,
      },
      orderBy,
    })

    return {
      configBalanzas,
    };

  }

  // Crear configuracion - Inicializacion
  async insert(createData: any): Promise<ConfigBalanza> {

    const { creatorUserId } = createData;

    // Verificacion: La configuracion ya fue inicializada
    const configBalanzaDB = await this.prisma.configBalanza.findMany({});
    if (configBalanzaDB[0]) throw new NotFoundException('La configuracion ya se encuentra inicializada');

    const data = {
      creatorUserId,
    };

    return await this.prisma.configBalanza.create({ data, include: { creatorUser: true } });
  
  }

  // Actualizar configBalanza
  async update(id: number, updateData: Prisma.ConfigBalanzaUpdateInput): Promise<ConfigBalanza> {
    return await this.prisma.configBalanza.update({
      where: { id },
      data: updateData,
      include: {
        creatorUser: true
      }
    })
  }

}

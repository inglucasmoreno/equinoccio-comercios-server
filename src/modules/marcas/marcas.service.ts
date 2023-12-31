import { Injectable, NotFoundException } from '@nestjs/common';
import { Marcas, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MarcasService {

  constructor(private prisma: PrismaService) { }

  // Marca por ID
  async getId(id: number): Promise<Marcas> {

    const marca = await this.prisma.marcas.findFirst({
      where: { id },
      include: {
        creatorUser: true,
      }
    })

    if (!marca) throw new NotFoundException('La marca no existe');
    return marca;

  }

  // Listar marcas
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

    let where: any = {
      activo: activo === 'true' ? true : false
    };

    // where.OR.push({
    //   descripcion: {
    //     contains: parametro.toUpperCase()
    //   }
    // })

    // Total de marcas
    const totalItems = await this.prisma.marcas.count({ where });

    // Listado de marcas
    const marcas = await this.prisma.marcas.findMany({
      take: Number(itemsPorPagina),
      include: {
        creatorUser: true,
      },
      // skip: (pagina - 1) * itemsPorPagina,
      orderBy,
      // where: {
      //   activo: false
      // }
    })

    return {
      marcas,
      totalItems,
    };

  }

  // Crear marca
  async insert(createData: Prisma.MarcasCreateInput): Promise<Marcas> {

    // Uppercase
    createData.descripcion = createData.descripcion?.toLocaleUpperCase().trim();

    // Verificacion: Descripcion repetida
    let marcaDB = await this.prisma.marcas.findFirst({ where: { descripcion: createData.descripcion } });
    if (marcaDB) throw new NotFoundException('La marca ya se encuentra cargada');

    return await this.prisma.marcas.create({ data: createData, include: { creatorUser: true } });

  }

  // Actualizar marca
  async update(id: number, updateData: Prisma.MarcasUpdateInput): Promise<Marcas> {

    const { descripcion } = updateData;

    // Uppercase
    updateData.descripcion = updateData.descripcion?.toString().toLocaleUpperCase().trim();

    const marcaDB = await this.prisma.marcas.findFirst({ where: { id } });

    // Verificacion: La marca no existe
    if (!marcaDB) throw new NotFoundException('La marca no existe');

    // Verificacion: Marca repetida
    if (descripcion) {
      const marcaRepetida = await this.prisma.marcas.findFirst({ where: { descripcion: descripcion.toString() } })
      if (marcaRepetida && marcaRepetida.id !== id) throw new NotFoundException('La marca ya se encuentra cargada');
    }

    return await this.prisma.marcas.update({
      where: { id },
      data: updateData,
      include: {
        creatorUser: true
      }
    })

  }

}

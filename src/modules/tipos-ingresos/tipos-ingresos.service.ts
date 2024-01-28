import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, TiposIngresos } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TiposIngresosService {

    constructor(private prisma: PrismaService) { }

    // TiposIngresos por ID
    async getId(id: number): Promise<TiposIngresos> {
  
      const tipo = await this.prisma.tiposIngresos.findFirst({
        where: { id },
        include: {
          creatorUser: true,
        }
      })
  
      if (!tipo) throw new NotFoundException('El tipo no existe');
      return tipo;
  
    }
  
    // Listar tipos
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

      if (activo !== '') {
        where = {
          ...where,
          activo: activo === 'true' ? true : false
        };
      }
  
      // where.OR.push({
      //   descripcion: {
      //     contains: parametro.toUpperCase()
      //   }
      // })
  
      // Total de tipos
      const totalItems = await this.prisma.tiposIngresos.count({ where });
  
      // Listado de tipos
      const tipos = await this.prisma.tiposIngresos.findMany({
        take: Number(itemsPorPagina),
        include: {
          creatorUser: true,
        },
        // skip: (pagina - 1) * itemsPorPagina,
        orderBy,
        where
      })
  
      return {
        tipos,
        totalItems,
      };
  
    }
  
    // Crear tipo
    async insert(createData: Prisma.TiposIngresosCreateInput): Promise<TiposIngresos> {
  
      // Uppercase
      createData.descripcion = createData.descripcion?.toLocaleUpperCase().trim();
  
      // Verificacion: Descripcion repetida
      let tipoDB = await this.prisma.tiposIngresos.findFirst({ where: { descripcion: createData.descripcion } });
      if (tipoDB) throw new NotFoundException('El tipo ya se encuentra cargada');
  
      return await this.prisma.tiposIngresos.create({ data: createData, include: { creatorUser: true } });
  
    }
  
    // Actualizar tipo
    async update(id: number, updateData: Prisma.TiposIngresosUpdateInput): Promise<TiposIngresos> {
  
      const { descripcion } = updateData;
  
      // Uppercase
      updateData.descripcion = updateData.descripcion?.toString().toLocaleUpperCase().trim();
  
      const tipoDB = await this.prisma.tiposIngresos.findFirst({ where: { id } });
  
      // Verificacion: El tipo no existe
      if (!tipoDB) throw new NotFoundException('El tipo no existe');
  
      // Verificacion: Tipo repetido
      if (descripcion) {
        const tipoRepetido = await this.prisma.tiposIngresos.findFirst({ where: { descripcion: descripcion.toString() } })
        if (tipoRepetido && tipoRepetido.id !== id) throw new NotFoundException('El tipo ya se encuentra cargada');
      }
  
      return await this.prisma.tiposIngresos.update({
        where: { id },
        data: updateData,
        include: {
          creatorUser: true
        }
      })
  
    }

}

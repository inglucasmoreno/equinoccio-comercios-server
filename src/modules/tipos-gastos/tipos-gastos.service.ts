import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, TiposGastos } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TiposGastosService {

    constructor(private prisma: PrismaService) { }

    // TiposGastos por ID
    async getId(id: number): Promise<TiposGastos> {
  
      const tipo = await this.prisma.tiposGastos.findFirst({
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
  
      let where: any = {
        activo: activo === 'true' ? true : false
      };
  
      // where.OR.push({
      //   descripcion: {
      //     contains: parametro.toUpperCase()
      //   }
      // })
  
      // Total de tipos
      const totalItems = await this.prisma.tiposGastos.count({ where });
  
      // Listado de tipos
      const tipos = await this.prisma.tiposGastos.findMany({
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
        tipos,
        totalItems,
      };
  
    }
  
    // Crear tipo
    async insert(createData: Prisma.TiposGastosCreateInput): Promise<TiposGastos> {
  
      // Uppercase
      createData.descripcion = createData.descripcion?.toLocaleUpperCase().trim();
  
      // Verificacion: Descripcion repetida
      let tipoDB = await this.prisma.tiposGastos.findFirst({ where: { descripcion: createData.descripcion } });
      if (tipoDB) throw new NotFoundException('El tipo ya se encuentra cargada');
  
      return await this.prisma.tiposGastos.create({ data: createData, include: { creatorUser: true } });
  
    }
  
    // Actualizar tipo
    async update(id: number, updateData: Prisma.TiposGastosUpdateInput): Promise<TiposGastos> {
  
      const { descripcion } = updateData;
  
      // Uppercase
      updateData.descripcion = updateData.descripcion?.toString().toLocaleUpperCase().trim();
  
      const tipoDB = await this.prisma.tiposGastos.findFirst({ where: { id } });
  
      // Verificacion: El tipo no existe
      if (!tipoDB) throw new NotFoundException('El tipo no existe');
  
      // Verificacion: Tipo repetido
      if (descripcion) {
        const tipoRepetido = await this.prisma.tiposGastos.findFirst({ where: { descripcion: descripcion.toString() } })
        if (tipoRepetido && tipoRepetido.id !== id) throw new NotFoundException('El tipo ya se encuentra cargada');
      }
  
      return await this.prisma.tiposGastos.update({
        where: { id },
        data: updateData,
        include: {
          creatorUser: true
        }
      })
  
    }

}

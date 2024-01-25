import { Injectable, NotFoundException } from '@nestjs/common';
import { Cajas, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CajasService {

    constructor(private prisma: PrismaService) { }

    // Caja por ID
    async getId(id: number): Promise<Cajas> {
  
      const caja = await this.prisma.cajas.findFirst({
        where: { id },
        include: {
          creatorUser: true,
        }
      })
  
      if (!caja) throw new NotFoundException('La caja no existe');
      return caja;
  
    }
  
    // Listar cajas
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
  
      // where.OR.push({
      //   descripcion: {
      //     contains: parametro.toUpperCase()
      //   }
      // })
  
      // Total de cajas
      const totalItems = await this.prisma.cajas.count({ where });
  
      // Listado de cajas
      const cajas = await this.prisma.cajas.findMany({
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
        cajas,
        totalItems,
      };
  
    }
  
    // Crear caja
    async insert(createData: Prisma.CajasCreateInput): Promise<Cajas> {
      return await this.prisma.cajas.create({ data: createData, include: { creatorUser: true } });
    }
  
    // Actualizar caja
    async update(id: number, updateData: Prisma.CajasUpdateInput): Promise<Cajas> {
  
      const cajaDB = await this.prisma.cajas.findFirst({ where: { id } });
  
      // Verificacion: La caja no existe
      if (!cajaDB) throw new NotFoundException('La caja no existe');
    
      return await this.prisma.cajas.update({
        where: { id },
        data: updateData,
        include: {
          creatorUser: true
        }
      })
  
    }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, VentasProductos } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VentasProductosService {

    constructor(private prisma: PrismaService) { }

    // Relacion por ID
    async getId(id: number): Promise<VentasProductos> {

        const relacion = await this.prisma.ventasProductos.findFirst({
            where: { id },
            include: {
                creatorUser: true,
            }
        })

        if (!relacion) throw new NotFoundException('El producto no existe');
        return relacion;

    }

    // Listar relaciones
    async getAll({
        columna = 'createdAt',
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

        // Total de relaciones
        const totalItems = await this.prisma.ventasProductos.count({ where });

        // Listado de relaciones
        const relaciones = await this.prisma.ventasProductos.findMany({
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
            relaciones,
            totalItems,
        };

    }

    // Crear relacion
    async insert(createData: Prisma.VentasProductosCreateInput): Promise<VentasProductos> {
        return await this.prisma.ventasProductos.create({ data: createData, include: { creatorUser: true } });
    }

    // Actualizar relacion
    async update(id: number, updateData: Prisma.VentasProductosUpdateInput): Promise<VentasProductos> {

        const relacionDB = await this.prisma.ventasProductos.findFirst({ where: { id } });

        // Verificacion: La relacion no existe
        if (!relacionDB) throw new NotFoundException('El producto no existe');

        return await this.prisma.ventasProductos.update({
            where: { id },
            data: updateData,
            include: {
                creatorUser: true
            }
        })

    }

}

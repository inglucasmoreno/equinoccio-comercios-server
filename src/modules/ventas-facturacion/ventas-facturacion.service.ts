import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, VentasFacturacion } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VentasFacturacionService {

    constructor(private prisma: PrismaService) { }

    // Relacion por ID
    async getId(id: number): Promise<VentasFacturacion> {

        const relacion = await this.prisma.ventasFacturacion.findFirst({
            where: { id },
            include: {
                creatorUser: true,
            }
        })

        if (!relacion) throw new NotFoundException('La facturacion no existe');
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
        const totalItems = await this.prisma.ventasFacturacion.count({ where });

        // Listado de relaciones
        const relaciones = await this.prisma.ventasFacturacion.findMany({
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
    async insert(createData: Prisma.VentasFacturacionCreateInput): Promise<VentasFacturacion> {
        return await this.prisma.ventasFacturacion.create({ data: createData, include: { creatorUser: true } });
    }

    // Actualizar relacion
    async update(id: number, updateData: Prisma.VentasFacturacionUpdateInput): Promise<VentasFacturacion> {

        const relacionDB = await this.prisma.ventasFacturacion.findFirst({ where: { id } });

        // Verificacion: La relacion no existe
        if (!relacionDB) throw new NotFoundException('La facturacion no existe');

        return await this.prisma.ventasFacturacion.update({
            where: { id },
            data: updateData,
            include: {
                creatorUser: true
            }
        })

    }

}

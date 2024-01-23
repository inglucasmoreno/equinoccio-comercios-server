import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, VentasFormasPago } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VentasFormasPagoService {

    constructor(private prisma: PrismaService) { }

    // Relacion por ID
    async getId(id: number): Promise<VentasFormasPago> {

        const relacion = await this.prisma.ventasFormasPago.findFirst({
            where: { id },
            include: {
                creatorUser: true,
            }
        })

        if (!relacion) throw new NotFoundException('La forma de pago no existe');
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
        const totalItems = await this.prisma.ventasFormasPago.count({ where });

        // Listado de relaciones
        const relaciones = await this.prisma.ventasFormasPago.findMany({
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
    async insert(createData: Prisma.VentasFormasPagoCreateInput): Promise<VentasFormasPago> {
        return await this.prisma.ventasFormasPago.create({ data: createData, include: { creatorUser: true } });
    }

    // Actualizar relacion
    async update(id: number, updateData: any): Promise<VentasFormasPago> {

        const relacionDB = await this.prisma.ventasFormasPago.findFirst({ where: { id } });

        // Verificacion: La relacion no existe
        if (!relacionDB) throw new NotFoundException('La forma de pago no existe');
        
        // Verificacion: La forma de pago ya se encuentra en esta venta
        const formaPagoDB = await this.prisma.ventasFormasPago.findFirst({
            where: {
                ventaId: relacionDB.ventaId,
                descripcion: updateData.descripcion
            }
        })
        
        if (formaPagoDB && formaPagoDB.id !== id) throw new NotFoundException('La forma de pago ya se encuentra en esta venta');
        
        return await this.prisma.ventasFormasPago.update({
            where: { id },
            data: updateData,
            include: {
                creatorUser: true
            }
        })

    }

}

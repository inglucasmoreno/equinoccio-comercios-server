import { Injectable, NotFoundException } from '@nestjs/common';
import { CajasVentas, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CajasVentasService {

    constructor(private prisma: PrismaService) { }

    // CajaVenta por ID
    async getId(id: number): Promise<CajasVentas> {

        const relacion = await this.prisma.cajasVentas.findFirst({
            where: { id },
            include: {
                caja: true,
                venta: true,
                creatorUser: true,
            }
        })

        if (!relacion) throw new NotFoundException('La relacion no existe');
        return relacion;

    }

    // Listar relacion
    async getAll({
        columna = 'id',
        direccion = 'desc',
        activo = '',
        parametro = '',
        pagina = 1,
        caja = '',
        itemsPorPagina = 10000
    }: any): Promise<any> {

        // Ordenando datos
        let orderBy = {};
        orderBy[columna] = direccion;

        let where = {};

        if (activo) {
            where = {
                ...where,
                activo: activo === 'true' ? true : false
            };
        }

        if (caja) {
            where = {
                ...where,
                cajaId: Number(caja)
            };
        }

        // Total de relaciones
        const totalItems = await this.prisma.cajasVentas.count({ where });

        // Listado de relaciones
        const relaciones = await this.prisma.cajasVentas.findMany({
            take: Number(itemsPorPagina),
            include: {
                caja: true,
                venta: true,
                creatorUser: true,
            },
            orderBy,
            where
        })

        return {
            relaciones,
            totalItems,
        };

    }

    // Crear relacion
    async insert(createData: Prisma.CajasVentasCreateInput): Promise<CajasVentas> {
        return await this.prisma.cajasVentas.create({
            data: createData, include: {
                caja: true,
                venta: true,
                creatorUser: true,
            }
        });
    }

    // Actualizar relacion
    async update(id: number, updateData: Prisma.CajasVentasUpdateInput): Promise<CajasVentas> {

        const relacionDB = await this.prisma.cajasVentas.findFirst({ where: { id } });

        // Verificacion: La relacion no existe
        if (!relacionDB) throw new NotFoundException('La relacion no existe');

        return await this.prisma.cajasVentas.update({
            where: { id },
            data: updateData,
            include: {
                caja: true,
                venta: true,
                creatorUser: true
            }
        })

    }


}

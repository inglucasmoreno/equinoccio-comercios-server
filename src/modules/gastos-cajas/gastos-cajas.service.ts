import { Injectable, NotFoundException } from '@nestjs/common';
import { GastosCajas, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GastosCajasService {

    constructor(private prisma: PrismaService) { }

    // Gasto por ID
    async getId(id: number): Promise<GastosCajas> {

        const gasto = await this.prisma.gastosCajas.findFirst({
            where: { id },
            include: {
                caja: true,
                tipoGasto: true,
                creatorUser: true,
            }
        })

        if (!gasto) throw new NotFoundException('El gasto no existe');
        return gasto;

    }

    // Listar gastos
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

        // Total de gastos
        const totalItems = await this.prisma.gastosCajas.count({ where });

        // Listado de gastos
        const gastos = await this.prisma.gastosCajas.findMany({
            take: Number(itemsPorPagina),
            include: {
                caja: true,
                tipoGasto: true,
                creatorUser: true,
            },
            orderBy,
            where
        })

        return {
            gastos,
            totalItems,
        };

    }

    // Crear gasto
    async insert(createData: Prisma.GastosCajasCreateInput): Promise<GastosCajas> {

        // Uppercase
        createData.descripcion = createData.descripcion?.toLocaleUpperCase().trim();

        return await this.prisma.gastosCajas.create({
            data: createData, include: {
                caja: true,
                tipoGasto: true,
                creatorUser: true
            }
        });
    }

    // Actualizar gasto
    async update(id: number, updateData: Prisma.GastosCajasUpdateInput): Promise<GastosCajas> {

        // Uppercase
        updateData.descripcion = updateData.descripcion?.toString().toLocaleUpperCase().trim();

        const gastoDB = await this.prisma.gastosCajas.findFirst({ where: { id } });

        // Verificacion: El gasto no existe
        if (!gastoDB) throw new NotFoundException('El gasto no existe');

        return await this.prisma.gastosCajas.update({
            where: { id },
            data: updateData,
            include: {
                caja: true,
                tipoGasto: true,
                creatorUser: true
            }
        })

    }

    // Eliminar gasto
    async delete(id: number): Promise<GastosCajas> {

        const gastoDB = await this.prisma.gastosCajas.findFirst({ where: { id } });

        // Verificacion: El gasto no existe
        if (!gastoDB) throw new NotFoundException('El gasto no existe');

        return await this.prisma.gastosCajas.delete(
            {
                where: { id },
                include: {
                    caja: true,
                    tipoGasto: true,
                    creatorUser: true
                }
            }
        )

    }

}

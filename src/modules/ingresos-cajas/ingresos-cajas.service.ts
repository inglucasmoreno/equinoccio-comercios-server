import { Injectable, NotFoundException } from '@nestjs/common';
import { IngresosCajas, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IngresosCajasService {

    constructor(private prisma: PrismaService) { }

    // Ingreso por ID
    async getId(id: number): Promise<IngresosCajas> {

        const ingreso = await this.prisma.ingresosCajas.findFirst({
            where: { id },
            include: {
                caja: true,
                tipoIngreso: true,
                creatorUser: true,
            }
        })

        if (!ingreso) throw new NotFoundException('El ingreso no existe');
        return ingreso;

    }

    // Listar ingresos
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

        // Total de ingresos
        const totalItems = await this.prisma.ingresosCajas.count({ where });

        // Listado de ingresos
        const ingresos = await this.prisma.ingresosCajas.findMany({
            take: Number(itemsPorPagina),
            include: {
                caja: true,
                tipoIngreso: true,
                creatorUser: true
            },
            orderBy,
            where
        })

        return {
            ingresos,
            totalItems,
        };

    }

    // Crear ingreso
    async insert(createData: Prisma.IngresosCajasCreateInput): Promise<IngresosCajas> {

        // Uppercase
        createData.descripcion = createData.descripcion?.toLocaleUpperCase().trim();

        console.log(createData);

        return await this.prisma.ingresosCajas.create({
            data: createData,
            include: {
                caja: true,
                tipoIngreso: true,
                creatorUser: true
            }
        });
    }

    // Actualizar ingreso
    async update(id: number, updateData: Prisma.IngresosCajasUpdateInput): Promise<IngresosCajas> {

        // Uppercase
        updateData.descripcion = updateData.descripcion?.toString().toLocaleUpperCase().trim();

        const ingresoDB = await this.prisma.ingresosCajas.findFirst({ where: { id } });

        // Verificacion: El ingreso no existe
        if (!ingresoDB) throw new NotFoundException('El ingreso no existe');

        return await this.prisma.ingresosCajas.update({
            where: { id },
            data: updateData,
            include: {
                caja: true,
                tipoIngreso: true,
                creatorUser: true
            }
        })

    }

    // Eliminar ingreso
    async delete(id: number): Promise<IngresosCajas> {

        const ingresoDB = await this.prisma.ingresosCajas.findFirst({ where: { id } });

        // Verificacion: El ingreso no existe
        if (!ingresoDB) throw new NotFoundException('El ingreso no existe');

        return await this.prisma.ingresosCajas.delete(
            {
                where: { id },
                include: {
                    caja: true,
                    tipoIngreso: true,
                    creatorUser: true
                }
            }
        )

    }

}



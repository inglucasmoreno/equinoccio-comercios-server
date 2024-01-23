import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Ventas } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VentasService {

    constructor(private prisma: PrismaService) { }

    // Venta por ID
    async getId(id: number): Promise<Ventas> {

        const venta = await this.prisma.ventas.findFirst({
            where: { id },
            include: {
                ventasProductos: true,
                ventasFacturacion: true,
                ventasFormasPago: true,
                creatorUser: true,
            }
        })

        if (!venta) throw new NotFoundException('La venta no existe');
        return venta;

    }

    // Listar ventas
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

        // Total de ventas
        const totalItems = await this.prisma.ventas.count({ where });

        // Listado de ventas
        const ventas = await this.prisma.ventas.findMany({
            take: Number(itemsPorPagina),
            include: {
                ventasProductos: {
                    include: {
                        producto: {
                            include: {
                                unidadMedida: true
                            }
                        }
                    },
                },
                ventasFacturacion: true,
                ventasFormasPago: true,
                creatorUser: true,
            },
            // skip: (pagina - 1) * itemsPorPagina,
            orderBy,
            // where: {
            //   activo: false
            // }
        })

        return {
            ventas,
            totalItems,
        };

    }

    // Crear venta
    async insert(createData: any): Promise<Ventas> {

        const {
            dataVenta,
            dataFacturacion,
            dataFormasPago,
            dataProductos,
            dataOtros
        } = createData;

        // Generacion de venta
        const ventaDB = await this.prisma.ventas.create({
            data: dataVenta,
            include: {
                creatorUser: true
            }
        });

        // Se agregar el idVenta a las formas de pago
        dataFormasPago.forEach((formaPago: any) => {
            formaPago.ventaId = ventaDB.id;
        });

        // Se agregar el idVenta a los productos
        dataProductos.forEach((producto: any) => {
            producto.ventaId = ventaDB.id;
        });

        // Se reduce el stock
        dataProductos.forEach(async (producto: any) => {
            const productoDB = await this.prisma.productos.findFirst({
                where: { id: producto.productoId }
            });
            if (productoDB) {
                await this.prisma.productos.update({
                    where: { id: producto.productoId },
                    data: { cantidad: productoDB.cantidad - producto.cantidad }
                });
            }
        });

        // Relacion -> Venta - Formas de pago
        await this.prisma.ventasFormasPago.createMany({
            data: dataFormasPago
        });

        // Relacion -> Venta - Productos
        await this.prisma.ventasProductos.createMany({
            data: dataProductos
        });

        // TODO: FACTURACION

        return ventaDB;
    }

    // Actualizar venta
    async update(id: number, updateData: Prisma.VentasUpdateInput): Promise<Ventas> {

        const ventaDB = await this.prisma.ventas.findFirst({ where: { id } });

        // Verificacion: La venta no existe
        if (!ventaDB) throw new NotFoundException('La venta no existe');

        return await this.prisma.ventas.update({
            where: { id },
            data: updateData,
            include: {
                ventasProductos: true,
                ventasFacturacion: true,
                ventasFormasPago: true,
                creatorUser: true,
            }
        })

    }

}

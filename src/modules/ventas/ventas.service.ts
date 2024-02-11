import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Ventas } from '@prisma/client';
import { add } from 'date-fns';
import { PrismaService } from 'src/prisma.service';
import PdfPrinter from 'pdfmake';

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
        formaPago = '',
        comprobante = '',
        pagina = 1,
        fechaDesde = '',
        fechaHasta = '',
        cajaId = '',
        itemsPorPagina = 1000
    }: any): Promise<any> {

        // Ordenando datos
        let orderBy = {};
        orderBy[columna] = direccion;

        let where: any = {}

        let activoTotales: any = {}

        if (activo !== '') {
            where = {
                ...where,
                activo: activo === 'true' ? true : false
            },
                activoTotales = activo === 'true' ? true : false
        }

        let whereVentasTMP: any = {
            fechaVenta: {
                gte: fechaDesde !== '' ? add(new Date(fechaDesde), { hours: 3 }) : new Date('1970-01-01T00:00:00.000Z'),
                lte: fechaHasta !== '' ? add(new Date(fechaHasta), { days: 1, hours: 3 }) : new Date('9000-01-01T00:00:00.000Z'),
            },
            activo: activoTotales
        }

        let whereTotalFacturadas: any = {
            comprobante: 'Facturacion',
            fechaVenta: {
                gte: fechaDesde !== '' ? add(new Date(fechaDesde), { hours: 3 }) : new Date('1970-01-01T00:00:00.000Z'),
                lte: fechaHasta !== '' ? add(new Date(fechaHasta), { days: 1, hours: 3 }) : new Date('9000-01-01T00:00:00.000Z'),
            },
            activo: activoTotales
        }

        let whereTotalPedidosYa: any = {
            ventasFormasPago: {
                some: {
                    descripcion: {
                        in: ['PedidosYa - Efectivo', 'PedidosYa - Online']
                    }
                }
            },
            fechaVenta: {
                gte: fechaDesde !== '' ? add(new Date(fechaDesde), { hours: 3 }) : new Date('1970-01-01T00:00:00.000Z'),
                lte: fechaHasta !== '' ? add(new Date(fechaHasta), { days: 1, hours: 3 }) : new Date('9000-01-01T00:00:00.000Z'),
            },
            activo: activoTotales
        }

        if (formaPago !== '') {
            where = {
                ...where,
                ventasFormasPago: {
                    some: {
                        descripcion: {
                            equals: formaPago
                        }
                    }
                },
            }
        }

        if (comprobante !== '') {
            where = {
                ...where,
                comprobante: {
                    equals: comprobante
                }
            }
        }
        // Filtrado por fechaDesde
        if (fechaDesde !== '') {
            where = {
                ...where,
                fechaVenta: {
                    gte: add(new Date(fechaDesde), { hours: 3 })
                }
            }
        }

        // Filtrado por fechaHasta
        if (fechaHasta !== '') {
            where = {
                ...where,
                fechaVenta: {
                    lte: add(new Date(fechaHasta), { days: 1, hours: 3 })
                }
            }
        }

        // Filtrado por cajaId
        if (cajaId !== '') {
            where = {
                ...where,
                cajaId: {
                    equals: Number(cajaId)
                }
            },
                whereTotalFacturadas = {
                    ...whereTotalFacturadas,
                    cajaId: {
                        equals: Number(cajaId)
                    }
                },
                whereVentasTMP = {
                    ...whereVentasTMP,
                    cajaId: {
                        equals: Number(cajaId)
                    }
                },
                whereTotalPedidosYa = {
                    ...whereTotalPedidosYa,
                    cajaId: {
                        equals: Number(cajaId)
                    }
                }
        }

        const [totalItems, ventas, totalVentasTMP, totalVentasFacturadasTMP, totalVentasPedidosYaTMP] = await Promise.all([

            // Total de items
            await this.prisma.ventas.count({
                where: {
                    ...where,
                    fechaVenta: {
                        gte: fechaDesde !== '' ? add(new Date(fechaDesde), { hours: 3 }) : new Date('1970-01-01T00:00:00.000Z'),
                        lte: fechaHasta !== '' ? add(new Date(fechaHasta), { days: 1, hours: 3 }) : new Date('9000-01-01T00:00:00.000Z'),
                    },
                }
            }),

            // Listado de ventas
            await this.prisma.ventas.findMany({
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
                skip: (pagina - 1) * itemsPorPagina,
                orderBy,
                where: {
                    ...where,
                    fechaVenta: {
                        gte: fechaDesde !== '' ? add(new Date(fechaDesde), { hours: 3 }) : new Date('1970-01-01T00:00:00.000Z'),
                        lte: fechaHasta !== '' ? add(new Date(fechaHasta), { days: 1, hours: 3 }) : new Date('9000-01-01T00:00:00.000Z'),
                    },
                }
            }),

            // Total de ventas TMP para calculos
            await this.prisma.ventas.aggregate({
                _sum: {
                    precioTotal: true,
                },
                where: whereVentasTMP
            }),

            // Total ventas facturadas - TMP
            await this.prisma.ventas.aggregate({
                _sum: {
                    precioTotal: true,
                },
                where: whereTotalFacturadas
            }),

            // Calcular precioTotal acumulado de las ventas pedidosYa
            await this.prisma.ventas.aggregate({
                _sum: {
                    precioTotal: true,
                },
                where: whereTotalPedidosYa
            }),
        ]);

        let totalVentasPedidosYa = totalVentasPedidosYaTMP._sum.precioTotal;
        let totalVentas = totalVentasTMP._sum.precioTotal;
        let totalVentasFacturadas = totalVentasFacturadasTMP._sum.precioTotal;

        return {
            ventas,
            totalItems: totalItems ? totalItems : 0,
            totales: {
                totalVentas: totalVentas ? totalVentas : 0,
                totalVentasFacturadas: totalVentasFacturadas ? totalVentasFacturadas : 0,
                totalVentasPedidosYa: totalVentasPedidosYa ? totalVentasPedidosYa : 0,
            }
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

        // Verificacion: Caja activa
        const cajaDB = await this.prisma.cajas.findFirst({
            where: { activo: true }
        });

        if (!cajaDB) throw new NotFoundException('Primero debes activar una caja');

        const data = {
            ...dataVenta,
            cajaId: cajaDB.id,
        }

        // Generacion de venta
        const ventaDB = await this.prisma.ventas.create({
            data,
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

    // Comprobante - Venta
    async generarComprobante(id: number): Promise<any> {

        const ventaDB = await this.prisma.ventas.findFirst({
            where: { id },
            include: {
                ventasProductos: {
                    include: {
                        producto: {
                            include: {
                                unidadMedida: true
                            }
                        }
                    }
                },
                ventasFacturacion: true,
                ventasFormasPago: true,
                creatorUser: true,
            }
        });

        // Verificacion: La venta no existe
        if (!ventaDB) throw new NotFoundException('La venta no existe');

        const pdfBuffer: Buffer = await new Promise(resolve => {

            let fonts = {
                Helvetica: {
                    normal: 'Helvetica',
                    bold: 'Helvetica-Bold',
                    italics: 'Helvetica-Oblique',
                    bolditalics: 'Helvetica-BoldOblique'
                },
            }

            const printer = new PdfPrinter(fonts);

            const docDefinition = {
                defaultStyle: { font: 'Helvetica' },
                content: [
                    {
                        text: 'Probando PDFMake'
                    }
                ],
                styles: {}
            }

            const pdfDoc = printer.createPdfKitDocument(docDefinition);

            const chunks = [];

            pdfDoc.on("data", (chunk) => {
                chunks.push(chunk);
            });

            pdfDoc.end();

            pdfDoc.on("end", () => {
                const result = Buffer.concat(chunks);
                resolve(result)
            })

        })

        return pdfBuffer;

    }



}

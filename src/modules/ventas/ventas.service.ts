import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Ventas, VentasFacturacion } from '@prisma/client';
import { add, format } from 'date-fns';
import { PrismaService } from 'src/prisma.service';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ConfigService } from '@nestjs/config';
import afip from '@afipsdk/afip.js';

@Injectable()
export class VentasService {

    constructor(
        private readonly configService: ConfigService,
        private prisma: PrismaService
    ) { }

    // Tipos de factura
    public facturaA = 1;
    public facturaB = 6;
    public facturaC = 11;

    // Tipos de documentos
    public DNI = 96;
    public CUIL = 86;
    public CUIT = 80;

    // Punto de venta
    public ptoVenta = 0;

    // Funcion para redondeo
    redondear(numero: number, decimales: number): number {

        if (typeof numero != 'number' || typeof decimales != 'number') return null;

        let signo = numero >= 0 ? 1 : -1;

        return Number((Math.round((numero * Math.pow(10, decimales)) + (signo * 0.0001)) / Math.pow(10, decimales)).toFixed(decimales));

    }

    // Conexion con AFIP
    public afipInstance: any = null;

    async afipConnection(): Promise<any> {
        const configuraciones = await this.prisma.afip.findFirst();
        this.ptoVenta = Number(configuraciones.puntoVenta);
        this.afipInstance = new afip({
            CUIT: configuraciones.cuit,
            cert: decodeURIComponent(configuraciones.cert),
            key: decodeURIComponent(configuraciones.key),
        });
        return true;
    }

    // Datos de contribuyente
    async datosContribuyente(CUIT: any): Promise<any> {
        if (!CUIT) throw new Error('Debe ingresar un CUIT');
        await this.afipConnection();
        const datosContribuyente = await this.afipInstance.RegisterInscriptionProof.getTaxpayerDetails(CUIT);
        console.log(datosContribuyente);
        return datosContribuyente;
    }

    // Obtenemos el ultimo numero de factura
    async proximoNumeroFactura(tipoFactura = 'B'): Promise<any> {

        await this.afipConnection();

        let tipoFacturaNro = 0;
        if (tipoFactura === 'A') tipoFacturaNro = this.facturaA;
        else if (tipoFactura === 'B') tipoFacturaNro = this.facturaB;
        else if (tipoFactura === 'C') tipoFacturaNro = this.facturaC;

        const ultimoNumero = await this.afipInstance.ElectronicBilling.getLastVoucher(this.ptoVenta, tipoFacturaNro).catch(() => {
            throw new NotFoundException('No hay conexión con el servidor de AFIP');
        })

        // Ajuste de formato
        const ultimoNumeroFormat = `${this.ptoVenta.toString().padStart(5, '0')}-${(ultimoNumero + 1).toString().padStart(8, '0')}`;

        return ultimoNumeroFormat;

    }

    // Venta por ID
    async getId(id: number): Promise<Ventas> {

        const venta = await this.prisma.ventas.findFirst({
            where: { id },
            include: {
                ventasProductos: true,
                ventasFacturacion: true,
                ventasFormasPago: true,
                ventasReservas: {
                    include: {
                        reserva: true,
                    }
                },
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
            comprobante: 'Fiscal',
            fechaVenta: {
                gte: fechaDesde !== '' ? add(new Date(fechaDesde), { hours: 3 }) : new Date('1970-01-01T00:00:00.000Z'),
                lte: fechaHasta !== '' ? add(new Date(fechaHasta), { days: 1, hours: 3 }) : new Date('9000-01-01T00:00:00.000Z'),
            },
            activo: activoTotales
        }

        let whereTotalFacturadasTipoA: any = {
            comprobante: 'FacturaA',
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

        const [totalItems, ventas, totalVentasTMP, totalVentasFacturadasTMP, totalVentasFacturadasTipoATMP, totalVentasPedidosYaTMP] = await Promise.all([

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
                    ventasReservas: {
                        include: {
                            reserva: true,
                        }
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

            // Total ventas facturadas tipo A - TMP
            await this.prisma.ventas.aggregate({
                _sum: {
                    precioTotal: true,
                },
                where: whereTotalFacturadasTipoA
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
        let totalVentasFacturadasTipoA = totalVentasFacturadasTipoATMP._sum.precioTotal;

        return {
            ventas,
            totalItems: totalItems ? totalItems : 0,
            totales: {
                totalVentas: totalVentas ? totalVentas : 0,
                totalVentasFacturadas: totalVentasFacturadas ? totalVentasFacturadas : 0,
                totalVentasFacturadasTipoA: totalVentasFacturadasTipoA ? totalVentasFacturadasTipoA : 0,
                totalVentasPedidosYa: totalVentasPedidosYa ? totalVentasPedidosYa : 0,
            }
        };

    }

    // Crear venta
    async insert(createData: any): Promise<Ventas> {

        const {
            dataVenta,
            dataFormasPago,
            dataProductos,
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

        return ventaDB;
    }

    // Crear venta - Facturacion
    async insertFacturacion(createData: any): Promise<Ventas> {

        const {
            dataVenta,
            dataFormasPago,
            dataProductos,
            dataFacturacion,
            sena
        } = createData;

        const {
            tipoFactura,
            razonSocial,
            tipoDocContribuyente,
            docContribuyente,
            domicilio,
            tipoPersona,
            tipoDomicilio
        } = dataFacturacion;

        // Verificacion: Caja activa
        const cajaDB = await this.prisma.cajas.findFirst({
            where: { activo: true }
        });

        if (!cajaDB) throw new NotFoundException('Primero debes activar una caja');

        const data = {
            ...dataVenta,
            cajaId: cajaDB.id,
        }

        await this.afipConnection();

        // FACTURACION - Conexion con AFIP

        let impTotal = createData.dataVenta.precioTotal;

        // Ultimo numero de comprobante
        const ultimoNumeroFactura = await this.afipInstance.ElectronicBilling.getLastVoucher(this.ptoVenta, tipoFactura === 'A' ? this.facturaA : this.facturaB).catch(() => {
            throw new NotFoundException('No hay conexión con el servidor de AFIP');
        })

        let cbteNro = ultimoNumeroFactura + 1;

        const date = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];

        let impNeto = 0;
        let impIVA = 0;
        let alicuotas = [];


        if (dataProductos.length !== 0 && !sena) {

            // Importes totales
            let impTotal21 = 0
            let impTotal105 = 0

            dataProductos.map((producto: any) => {

                if (producto.alicuota === 10.5) {               // -> 10.5
                    impTotal21 += producto.precioTotal
                } else {                                        // -> 21
                    impTotal105 += producto.precioTotal
                }

            })

            // TODO: Revisar
            // En caso de ser pago con credito se agrega el adicional
            if (dataVenta.adicionalCredito !== 0 && impTotal21 !== 0) {
                impTotal21 += dataVenta.adicionalCredito;
            } else if (dataVenta.adicionalCredito !== 0 && impTotal105 !== 0) {
                impTotal105 += dataVenta.adicionalCredito;
            }

            // Importes Netos
            let impNeto21 = this.redondear((impTotal21 / 1.21), 2);
            let impNeto105 = this.redondear((impTotal105 / 1.105), 2);
            impNeto = this.redondear(impNeto21 + impNeto105, 2)

            // Importe de IVA
            let impIVA21 = this.redondear(impTotal21 - impNeto21, 2);
            let impIVA105 = this.redondear(impTotal105 - impNeto105, 2);
            impIVA = this.redondear(impIVA21 + impIVA105, 2);

            // Arreglo de alicuotas

            if (impTotal21 !== 0) {         // Alicuota -> 21
                alicuotas.push({
                    'Id': 5,
                    'BaseImp': impNeto21,
                    'Importe': impIVA21
                })
            }

            if (impTotal105 !== 0) {        // Alicuota -> 10.5
                alicuotas.push({
                    'Id': 4,
                    'BaseImp': impNeto105,
                    'Importe': impIVA105
                })
            }

        } else { // -> El importe total corresponde a una seña

            impNeto = this.redondear((impTotal / 1.21), 2);
            impIVA = this.redondear((impTotal - impNeto), 2);

            alicuotas.push({
                'Id': 5,
                'BaseImp': impNeto,
                'Importe': impIVA
            })

        }

        // Adaptando tipo de documento
        let DocTipo = 99;
        if (tipoFactura !== 'B') {
            DocTipo = tipoDocContribuyente === 'CUIT' ?
                this.CUIT : tipoDocContribuyente === 'CUIL' ?
                    this.CUIL : this.DNI;
        }

        let dataFactura = {
            'CantReg': 1,                                                    // Cantidad de comprobantes a registrar
            'PtoVta': this.ptoVenta,                                         // Punto de venta
            'CbteTipo': tipoFactura === 'B' ? this.facturaB : this.facturaA, // Tipo de comprobante (Ej. 6 = B y 11 = C)
            'Concepto': 1,                                                   // (1)Productos, (2)Servicios, (3)Productos y Servicios
            'DocTipo': DocTipo,                                              // (99 consumidor final, ver tipos disponibles)
            'DocNro': tipoFactura === 'B' ? 0 : docContribuyente,            // Número de documento del comprador (0 consumidor final)
            'CbteDesde': cbteNro,                           // Número de comprobante o numero del primer comprobante en caso de ser mas de uno
            'CbteHasta': cbteNro,                           // Número de comprobante o numero del último comprobante en caso de ser mas de uno
            'CbteFch': parseInt(date.replace(/-/g, '')),    // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
            'ImpTotal': impTotal,                           // Importe total del comprobante
            'ImpTotConc': 0,                                // Importe neto no gravado
            'ImpNeto': impNeto,                             // Importe neto gravado - Sin incluir IVA
            'ImpOpEx': 0,                                   // Importe exento de IVA
            'ImpIVA': impIVA,                               // Importe total de IVA
            'ImpTrib': 0,                                   // Importe total de tributos
            'MonId': 'PES',                                 // Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos)
            'MonCotiz': 1,                                  // Cotización de la moneda usada (1 para pesos argentinos)
            'Iva': alicuotas,
        };

        const facturacion = await this.afipInstance.ElectronicBilling.createVoucher(dataFactura).catch((error) => {
            throw new NotFoundException(error.message);
        })

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

        // Relacion -> Venta - Facturacion
        await this.prisma.ventasFacturacion.create({
            data: {
                ventaId: ventaDB.id,
                nroComprobante: cbteNro,
                tipoComprobante: `Factura ${tipoFactura}`,
                codigoComprobante: this.facturaB,
                nroFormatComprobante: `${this.ptoVenta.toString().padStart(5, '0')}-${(cbteNro).toString().padStart(8, '0')}`,
                cae: facturacion.CAE,
                caeFechaVencimiento: facturacion.CAEFchVto,
                clienteRazonSocial: tipoFactura === 'A' ? razonSocial : '',
                clienteDocTipo: tipoFactura === 'A' ? tipoDocContribuyente : '',
                clienteDoc: tipoFactura === 'A' ? docContribuyente : '',
                clienteDomicilio: tipoFactura === 'A' ? domicilio : '',
                clienteTipoPersona: tipoFactura === 'A' ? tipoPersona : '',
                clienteTipoDomicilio: tipoFactura === 'A' ? tipoDomicilio : '',
                creatorUserId: ventaDB.creatorUserId
            }
        });

        return ventaDB;

    }

    // Actualizar a comprobante fiscal
    async updateFacturacion(idVenta, data: any): Promise<any> {

        const { creatorUserId, sena } = data;

        await this.afipConnection();

        // Se verifica si la venta existe
        const ventaDB = await this.prisma.ventas.findFirst({
            where: { id: idVenta },
            include: {
                ventasProductos: true
            }
        });

        if (!ventaDB) throw new NotFoundException('La venta no existe');

        await this.afipConnection();

        // FACTURACION - Conexion con AFIP

        let impTotal = ventaDB.precioTotal;

        // Ultimo numero de comprobante
        const ultimoNumeroFactura = await this.afipInstance.ElectronicBilling.getLastVoucher(this.ptoVenta, this.facturaB).catch(() => {
            throw new NotFoundException('No hay conexión con el servidor de AFIP');
        })

        let cbteNro = ultimoNumeroFactura + 1;

        const date = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];

        let impNeto = 0;
        let impIVA = 0;
        let alicuotas = [];


        if (ventaDB.ventasProductos.length !== 0 && !sena) {

            // Importes totales
            let impTotal21 = 0
            let impTotal105 = 0

            ventaDB.ventasProductos.map((producto: any) => {

                if (producto.alicuota === 10.5) {               // -> 10.5
                    impTotal21 += producto.precioTotal
                } else {                                        // -> 21
                    impTotal105 += producto.precioTotal
                }

            })

            // TODO: Revisar
            // En caso de ser pago con credito se agrega el adicional
            if (ventaDB.adicionalCredito !== 0 && impTotal21 !== 0) {
                impTotal21 += ventaDB.adicionalCredito;
            } else if (ventaDB.adicionalCredito !== 0 && impTotal105 !== 0) {
                impTotal105 += ventaDB.adicionalCredito;
            }

            // Importes Netos
            let impNeto21 = this.redondear((impTotal21 / 1.21), 2);
            let impNeto105 = this.redondear((impTotal105 / 1.105), 2);
            impNeto = this.redondear(impNeto21 + impNeto105, 2)

            // Importe de IVA
            let impIVA21 = this.redondear(impTotal21 - impNeto21, 2);
            let impIVA105 = this.redondear(impTotal105 - impNeto105, 2);
            impIVA = this.redondear(impIVA21 + impIVA105, 2);

            // Arreglo de alicuotas

            if (impTotal21 !== 0) {         // Alicuota -> 21
                alicuotas.push({
                    'Id': 5,
                    'BaseImp': impNeto21,
                    'Importe': impIVA21
                })
            }

            if (impTotal105 !== 0) {        // Alicuota -> 10.5
                alicuotas.push({
                    'Id': 4,
                    'BaseImp': impNeto105,
                    'Importe': impIVA105
                })
            }

        } else { // -> El importe total corresponde a una seña

            impNeto = this.redondear((impTotal / 1.21), 2);
            impIVA = this.redondear((impTotal - impNeto), 2);

            alicuotas.push({
                'Id': 5,
                'BaseImp': impNeto,
                'Importe': impIVA
            })

        }

        let dataFactura = {
            'CantReg': 1,                                   // Cantidad de comprobantes a registrar
            'PtoVta': this.ptoVenta,                        // Punto de venta
            'CbteTipo': this.facturaB,                      // Tipo de comprobante (Ej. 6 = B y 11 = C)
            'Concepto': 1,                                  // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
            'DocTipo': 99,                                  // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
            'DocNro': 0,                                    // Número de documento del comprador (0 consumidor final)
            'CbteDesde': cbteNro,                           // Número de comprobante o numero del primer comprobante en caso de ser mas de uno
            'CbteHasta': cbteNro,                           // Número de comprobante o numero del último comprobante en caso de ser mas de uno
            'CbteFch': parseInt(date.replace(/-/g, '')),    // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
            'ImpTotal': impTotal,                           // Importe total del comprobante
            'ImpTotConc': 0,                                // Importe neto no gravado
            'ImpNeto': impNeto,                             // Importe neto gravado - Sin incluir IVA
            'ImpOpEx': 0,                                   // Importe exento de IVA
            'ImpIVA': impIVA,                               // Importe total de IVA
            'ImpTrib': 0,                                   // Importe total de tributos
            'MonId': 'PES',                                 // Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos)
            'MonCotiz': 1,                                  // Cotización de la moneda usada (1 para pesos argentinos)
            'Iva': alicuotas,
        };

        const facturacion = await this.afipInstance.ElectronicBilling.createVoucher(dataFactura).catch((error) => {
            throw new NotFoundException(error.message);
        })

        // Relacion -> Venta - Facturacion
        await this.prisma.ventasFacturacion.create({
            data: {
                ventaId: idVenta,
                nroComprobante: cbteNro,
                tipoComprobante: 'Factura B',
                codigoComprobante: this.facturaB,
                nroFormatComprobante: `${this.ptoVenta.toString().padStart(5, '0')}-${(cbteNro).toString().padStart(8, '0')}`,
                cae: facturacion.CAE,
                caeFechaVencimiento: facturacion.CAEFchVto,
                creatorUserId: creatorUserId
            }
        });

        const dataUpdate = { comprobante: 'Fiscal' }

        // --> ACTUALIZACION DE VENTA -> Comprobante fiscal
        const venta = await this.prisma.ventas.update({
            where: { id: idVenta },
            data: dataUpdate,
            include: {
                ventasProductos: true,
                ventasReservas: true,
                ventasFacturacion: true,
                ventasFormasPago: true,
                creatorUser: true,
            }
        })
        return venta;

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

        const ventaDB: any = await this.prisma.ventas.findFirst({
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

        // Se obtienen los datos de sucursal
        const sucursalDB = await this.prisma.configGenerales.findFirst();

        // Adaptando -> Fecha de Venta
        const fechaVenta = add(ventaDB.fechaVenta, { hours: -3 });

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

            const docDefinition: TDocumentDefinitions = {
                defaultStyle: { font: 'Helvetica' },
                pageMargins: 10,
                pageSize: { width: 226.772, height: 841.89105 }, // 1 milimetro = 2.83465
                content: [
                    {
                        columns: [
                            {
                                image: this.configService.get('NODE_ENV') === 'production' ? `../public/files/img/Logo.png` : './public/files/img/Logo.png',
                                width: 70,
                            },
                            [
                                { text: `Fecha y hora`, fontSize: 9, marginLeft: 30, marginTop: 10 },
                                { text: `${format(fechaVenta, 'dd-MM-yyyy')} ${format(fechaVenta, 'HH:mm')}`, fontSize: 9, marginLeft: 20, marginTop: 4 },
                            ],
                        ],
                    },
                    {
                        text: `${sucursalDB.nombreEmpresa}`,
                        marginTop: 10,
                        fontSize: 10,
                        bold: true,
                    },
                    {
                        text: [
                            {
                                text: 'Domicilio: ',
                                bold: true,
                            }, `${sucursalDB.domicilioSucursal}`,
                        ],
                        marginTop: 5,
                        fontSize: 9
                    },
                    {
                        text: [
                            {
                                text: 'Telefono: ',
                                bold: true,
                            }, `${sucursalDB.telefonoSucursal}`,
                        ],
                        marginTop: 7,
                        fontSize: 9
                    },
                    {
                        text: '------------------------------------------------',
                        marginTop: 5,
                    },
                    {
                        text: 'A consumidor final',
                        fontSize: 9,
                        marginTop: 5,
                    },
                    {
                        text: '------------------------------------------------',
                        marginTop: 5,
                    },

                    {
                        text: 'Listado de productos',
                        bold: true,
                        fontSize: 11,
                        marginTop: 5,
                        marginBottom: 2,
                    },

                    ventaDB.ventasProductos.map((producto: any) => {
                        return [
                            {
                                text: `${producto.producto.descripcion} x ${producto.cantidad}`,
                                marginTop: 7,
                                fontSize: 9,
                            },
                            {
                                text: `$${parseFloat(producto.precioTotal).toFixed(2)}`,
                                marginTop: 3,
                                fontSize: 9,
                            }
                        ]
                    }),

                    {
                        text: '------------------------------------------------',
                        marginTop: 5,
                    },
                    {
                        text: [
                            {
                                text: 'TOTAL:',
                                bold: true,
                            }, ` $${parseFloat(ventaDB.precioTotal).toFixed(2)}`,
                        ],
                        marginTop: 7,
                        fontSize: 9
                    },
                    {
                        text: [
                            {
                                text: 'Forma de pago:',
                                bold: true,
                            }, ` ${ventaDB.ventasFormasPago.map(forma => forma.descripcion).join(', ')}`,
                        ],
                        marginTop: 7,
                        fontSize: 9
                    },
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

    // Comprobante - Fiscal
    async generarComprobanteFiscal(id: number): Promise<any> {

        const ventaDB: any = await this.prisma.ventas.findFirst({
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

        // Configuraciones - AFIP
        const configAfip = await this.prisma.afip.findFirst();

        // Adaptando -> Fecha de Venta
        const fechaVenta = add(ventaDB.fechaVenta, { hours: -3 });
        const fechaInicioActividad = format(configAfip.inicioActividad, 'dd-MM-yyyy');
        const fechaCaeVencimiento = format(add(new Date(ventaDB.ventasFacturacion[0].caeFechaVencimiento), { hours: 3 }), 'dd-MM-yyyy');

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

            const docDefinition: TDocumentDefinitions = {
                defaultStyle: { font: 'Helvetica' },
                pageMargins: 10,
                pageSize: { width: 226.772, height: 841.89105 }, // 1 milimetro = 2.83465
                content: [
                    {
                        columns: [
                            {
                                image: this.configService.get('NODE_ENV') === 'production' ? `../public/files/img/Logo.png` : './public/files/img/Logo.png',
                                width: 70,
                            },
                            [
                                { text: `Fecha y hora`, fontSize: 9, marginLeft: 30, marginTop: 10 },
                                { text: `${format(fechaVenta, 'dd-MM-yyyy')} ${format(fechaVenta, 'HH:mm')}`, fontSize: 9, marginLeft: 20, marginTop: 4 },
                            ],
                        ],
                    },

                    {
                        text: `${configAfip.razonSocial}`,
                        marginTop: 10,
                        fontSize: 10,
                        bold: true,
                    },
                    {
                        text: [`CUIT:${configAfip.cuit}  IIBB:${configAfip.iibb}`],
                        marginTop: 5,
                        fontSize: 8
                    },
                    {
                        text: [`${configAfip.domicilio}`],
                        marginTop: 5,
                        fontSize: 8
                    },
                    {
                        text: [`SAN LUIS (5700) - SAN LUIS`],
                        marginTop: 5,
                        fontSize: 8
                    },
                    {
                        text: [`INICIO DE ACTIVIDAD: ${fechaInicioActividad}`],
                        marginTop: 5,
                        fontSize: 8
                    },
                    {
                        text: '------------------------------------------------',
                        marginTop: 5,
                    },
                    {
                        text: 'FACTURA B',
                        fontSize: 9,
                        bold: true,
                        alignment: 'center',
                        marginTop: 5,
                    },
                    {
                        text: 'ORIGINAL (Cod. 006) - A CONSUMIDO FINAL',
                        fontSize: 9,
                        alignment: 'center',
                        marginTop: 5,
                    },
                    {
                        text: '------------------------------------------------',
                        marginTop: 5,
                    },

                    {
                        text: 'Listado de productos',
                        bold: true,
                        fontSize: 11,
                        marginTop: 5,
                        marginBottom: 2,
                    },

                    ventaDB.ventasProductos.map((producto: any) => {
                        return [
                            {
                                text: `${producto.producto.descripcion} x ${producto.cantidad}`,
                                marginTop: 7,
                                fontSize: 9,
                            },
                            {
                                text: `$${parseFloat(producto.precioTotal).toFixed(2)}`,
                                marginTop: 3,
                                fontSize: 9,
                            }
                        ]
                    }),
                    {
                        text: '------------------------------------------------',
                        marginTop: 5,
                    },
                    {
                        text: [
                            {
                                text: 'TOTAL:',
                                bold: true,
                            }, ` $${parseFloat(ventaDB.precioTotal).toFixed(2)}`,
                        ],
                        marginTop: 7,
                        fontSize: 9
                    },
                    {
                        text: [
                            {
                                text: 'Forma de pago:',
                                bold: true,
                            }, ` ${ventaDB.ventasFormasPago.map(forma => forma.descripcion).join(', ')}`,
                        ],
                        marginTop: 7,
                        fontSize: 9
                    },
                    {
                        text: '------------------------------------------------',
                        marginTop: 5,
                    },
                    {
                        text: [`REFERENCIA ELECTRONICA DEL COMPROBANTE`],
                        marginTop: 5,
                        fontSize: 8
                    },
                    {
                        text: [`CAE                                 Fecha Vto.`],
                        marginTop: 5,
                        marginLeft: 30,
                        fontSize: 8
                    },
                    {
                        text: [`${ventaDB.ventasFacturacion[0].cae}            ${fechaCaeVencimiento}`],
                        marginTop: 5,
                        marginLeft: 30,
                        fontSize: 8
                    },
                    {
                        text: '------------------------------------------------',
                        marginTop: 5,
                    },
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

    // Comprobante - Fiscal tipo A
    async generarComprobanteFiscalTipoA(id: number): Promise<any> {

        const ventaDB: any = await this.prisma.ventas.findFirst({
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

        // Configuraciones - AFIP
        const configAfip = await this.prisma.afip.findFirst();

        // Adaptando -> Fecha de Venta
        const fechaVenta = add(ventaDB.fechaVenta, { hours: -3 });
        const fechaInicioActividad = format(configAfip.inicioActividad, 'dd-MM-yyyy');
        const fechaCaeVencimiento = format(add(new Date(ventaDB.ventasFacturacion[0].caeFechaVencimiento), { hours: 3 }), 'dd-MM-yyyy');

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

            const docDefinition: TDocumentDefinitions = {
                defaultStyle: { font: 'Helvetica' },
                pageMargins: 10,
                pageSize: { width: 226.772, height: 841.89105 }, // 1 milimetro = 2.83465
                content: [
                    {
                        columns: [
                            {
                                image: this.configService.get('NODE_ENV') === 'production' ? `../public/files/img/Logo.png` : './public/files/img/Logo.png',
                                width: 70,
                            },
                            [
                                { text: `Fecha y hora`, fontSize: 9, marginLeft: 30, marginTop: 10 },
                                { text: `${format(fechaVenta, 'dd-MM-yyyy')} ${format(fechaVenta, 'HH:mm')}`, fontSize: 9, marginLeft: 20, marginTop: 4 },
                            ],
                        ],
                    },

                    {
                        text: `${configAfip.razonSocial}`,
                        marginTop: 10,
                        fontSize: 10,
                        bold: true,
                    },
                    {
                        text: [`CUIT:${configAfip.cuit}  IIBB:${configAfip.iibb}`],
                        marginTop: 5,
                        fontSize: 8,
                        
                    },
                    {
                        text: [`${configAfip.domicilio}`],
                        marginTop: 5,
                        fontSize: 8
                    },
                    {
                        text: [`SAN LUIS (5700) - SAN LUIS`],
                        marginTop: 5,
                        fontSize: 8
                    },
                    {
                        text: [`INICIO DE ACTIVIDAD: ${fechaInicioActividad}`],
                        marginTop: 5,
                        fontSize: 8
                    },
                    {
                        text: '------------------------------------------------',
                        marginTop: 5,
                    },
                    {
                        text: 'FACTURA A',
                        fontSize: 9,
                        bold: true,
                        alignment: 'left',
                        marginTop: 5,
                    },
                    {
                        text: 'ORIGINAL (Cod. 001)',
                        fontSize: 9,
                        alignment: 'left',
                        marginTop: 5,
                    },
                    {
                        text: `CLIENTE: ${ventaDB.ventasFacturacion[0].clienteRazonSocial}`,
                        fontSize: 8,
                        alignment: 'left',
                        marginTop: 5,
                    },
                    {
                        text: `TIPO PERSONA: ${ventaDB.ventasFacturacion[0].clienteTipoPersona}`,
                        fontSize: 8,
                        alignment: 'left',
                        marginTop: 5,
                    },
                    {
                        text: `${ventaDB.ventasFacturacion[0].clienteDocTipo}: ${ventaDB.ventasFacturacion[0].clienteDoc}`,
                        fontSize: 8,
                        alignment: 'left',
                        marginTop: 5,
                    },
                    {
                        text: `DOMICILIO: ${ventaDB.ventasFacturacion[0].clienteDomicilio}`,
                        fontSize: 8,
                        alignment: 'left',
                        marginTop: 5,
                    },
                    {
                        text: `TIPO DOMICILIO: ${ventaDB.ventasFacturacion[0].clienteTipoDomicilio}`,
                        fontSize: 8,
                        alignment: 'left',
                        marginTop: 5,
                    },
                    {
                        text: '------------------------------------------------',
                        marginTop: 5,
                    },
                    {
                        text: 'Listado de productos',
                        bold: true,
                        fontSize: 11,
                        marginTop: 5,
                        marginBottom: 2,
                    },

                    ventaDB.ventasProductos.map((producto: any) => {
                        return [
                            {
                                text: `${producto.producto.descripcion} x ${producto.cantidad}`,
                                marginTop: 7,
                                fontSize: 9,
                            },
                            {
                                text: `$${parseFloat(producto.precioTotal).toFixed(2)}`,
                                marginTop: 3,
                                fontSize: 9,
                            }
                        ]
                    }),
                    {
                        text: '------------------------------------------------',
                        marginTop: 5,
                    },
                    {
                        text: [
                            {
                                text: 'TOTAL:',
                                bold: true,
                            }, ` $${parseFloat(ventaDB.precioTotal).toFixed(2)}`,
                        ],
                        marginTop: 7,
                        fontSize: 9
                    },
                    {
                        text: [
                            {
                                text: 'Forma de pago:',
                                bold: true,
                            }, ` ${ventaDB.ventasFormasPago.map(forma => forma.descripcion).join(', ')}`,
                        ],
                        marginTop: 7,
                        fontSize: 9
                    },
                    {
                        text: '------------------------------------------------',
                        marginTop: 5,
                    },
                    {
                        text: [`REFERENCIA ELECTRONICA DEL COMPROBANTE`],
                        marginTop: 5,
                        fontSize: 8
                    },
                    {
                        text: [`CAE                                 Fecha Vto.`],
                        marginTop: 5,
                        marginLeft: 30,
                        fontSize: 8
                    },
                    {
                        text: [`${ventaDB.ventasFacturacion[0].cae}            ${fechaCaeVencimiento}`],
                        marginTop: 5,
                        marginLeft: 30,
                        fontSize: 8
                    },
                    {
                        text: '------------------------------------------------',
                        marginTop: 5,
                    },
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

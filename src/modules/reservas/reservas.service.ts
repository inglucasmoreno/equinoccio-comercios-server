import { Injectable, NotFoundException } from '@nestjs/common';
import { Reservas } from '@prisma/client';
import { add, format } from 'date-fns';
import { PrismaService } from 'src/prisma.service';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservasService {

  constructor(
    private readonly configService: ConfigService,
    private prisma: PrismaService
  ) { }

  // Reserva por ID
  async getId(id: number): Promise<Reservas> {

    const reserva = await this.prisma.reservas.findFirst({
      where: { id },
      include: {
        cliente: true,
        reservasProductos: {
          include: {
            producto: {
              include: {
                unidadMedida: true
              }
            }
          }
        },
        ventasReservas: {
          include: {
            venta: true
          }
        },
        creatorUser: true,
      }
    })

    if (!reserva) throw new NotFoundException('La reserva no existe');
    return reserva;

  }

  // Listar reservas
  async getAll({
    columna = 'id',
    direccion = 'desc',
    estado = '',
    fechaDesde = '',
    fechaHasta = '', 
    filtroPorVencer = 'false',
    parametro = '',
    pagina = 1,
    itemsPorPagina = 10000 
  }: any): Promise<any> {

    // Ordenando datos
    let orderBy = {};
    orderBy[columna] = direccion;

    let where: any = {};

    // Si viene el parametro debe buscar en el usuarios generador o el cliente
    if (parametro.trim() !== '') {
      where = {
        OR: [
          { usuarioCreador: { contains: parametro } },
          { cliente: { descripcion: { contains: parametro } } }
        ]
      }
    }

    // Solo las reservas por vencer
    if (filtroPorVencer === 'true') {
      const fechaHoy = new Date();
      where = {
        ...where,
        fechaAlerta: {
          lte: fechaHoy
        }
      }
    }

    if (estado.trim() !== '') where = { ...where, estado }

    // Total de reservas
    const totalItems = await this.prisma.reservas.count({ where });

    // Listado de reservas
    const reservas = await this.prisma.reservas.findMany({
      take: Number(itemsPorPagina),
      include: {
        cliente: true,
        creatorUser: true,
      },
      skip: (pagina - 1) * itemsPorPagina,
      orderBy,
      where: {
        ...where,
        fechaReserva: {
          gte: fechaDesde !== '' ? add(new Date(fechaDesde), { hours: 3 }) : new Date('1970-01-01T00:00:00.000Z'),
          lte: fechaHasta !== '' ? add(new Date(fechaHasta), { days: 1, hours: 3 }) : new Date('9000-01-01T00:00:00.000Z'),
        }
      }
    })

    return {
      reservas,
      totalItems,
    };

  }

  // Crear reserva
  async insert(createData: any): Promise<Reservas> {

    // Uppercase
    createData.usuarioCreador = createData.usuarioCreador?.toLocaleUpperCase().trim();
    createData.observaciones = createData.observaciones?.toLocaleUpperCase().trim();
    createData.tortaRelleno1 = createData.tortaRelleno1?.toLocaleUpperCase().trim();
    createData.tortaRelleno2 = createData.tortaRelleno2?.toLocaleUpperCase().trim();
    createData.tortaRelleno3 = createData.tortaRelleno3?.toLocaleUpperCase().trim();
    createData.tortaForma = createData.tortaForma?.toLocaleUpperCase().trim();
    createData.tortaCobertura = createData.tortaCobertura?.toLocaleUpperCase().trim();
    createData.tortaDetalles = createData.tortaDetalles?.toLocaleUpperCase().trim();

    // Adaptando fechas
    createData.fechaReserva = new Date(createData.fechaReserva);
    createData.fechaReserva.setHours(createData.fechaReserva.getHours() + 3);
    createData.fechaEntrega = new Date(createData.fechaEntrega);
    createData.fechaEntrega.setHours(createData.fechaEntrega.getHours() + 3);
    createData.fechaAlerta = new Date(createData.fechaAlerta);
    // createData.fechaAlerta.setHours(createData.fechaAlerta.getHours() + 3);

    // createData sin productos
    let dataReserva = { ...createData };
    delete dataReserva.productos;

    // Se crear la reserva
    const reservaDB = await this.prisma.reservas.create({
      data: dataReserva,
      include: {
        cliente: true,
        creatorUser: true
      }
    });

    // Productos -> Reserva
    if (createData.productos) {

      let productosAdt: any[] = []

      createData.productos.map(item => {
        productosAdt.push({
          cantidad: item.cantidad,
          productoId: item.productoId,
          precioTotal: item.precioTotal,
          precioUnitario: item.precioUnitario,
          reservaId: reservaDB.id,
          creatorUserId: createData.creatorUserId
        })
      })

      await this.prisma.reservasProductos.createMany({
        data: productosAdt
      });
    }

    return reservaDB;

  }

  // Actualizar reserva
  async update(id: number, updateData: any): Promise<Reservas> {

    // Uppercase
    updateData.usuarioCreador = updateData.usuarioCreador?.toString().toLocaleUpperCase().trim();
    updateData.observaciones = updateData.observaciones?.toString().toLocaleUpperCase().trim();
    updateData.tortaRelleno1 = updateData.tortaRelleno1?.toString().toLocaleUpperCase().trim();
    updateData.tortaRelleno2 = updateData.tortaRelleno2?.toString().toLocaleUpperCase().trim();
    updateData.tortaRelleno3 = updateData.tortaRelleno3?.toString().toLocaleUpperCase().trim();
    updateData.tortaForma = updateData.tortaForma?.toString().toLocaleUpperCase().trim();
    updateData.tortaCobertura = updateData.tortaCobertura?.toString().toLocaleUpperCase().trim();
    updateData.tortaDetalles = updateData.tortaDetalles?.toString().toLocaleUpperCase().trim();

    // Adaptando fechas
    if (updateData.fechaReserva) {
      updateData.fechaReserva = new Date(updateData.fechaReserva);
      updateData.fechaReserva.setHours(updateData.fechaReserva.getHours() + 3);
    }
    if (updateData.fechaEntrega) {
      updateData.fechaEntrega = new Date(updateData.fechaEntrega);
      updateData.fechaEntrega.setHours(updateData.fechaEntrega.getHours() + 3);
    }
    if (updateData.fechaAlerta) updateData.fechaAlerta = new Date(updateData.fechaAlerta);

    const reservaDB = await this.prisma.reservas.findFirst({ where: { id } });

    // Verificacion: La reserva no existe
    if (!reservaDB) throw new NotFoundException('La reserva no existe');

    return await this.prisma.reservas.update({
      where: { id },
      data: updateData,
      include: {
        cliente: true,
        creatorUser: true
      }
    })

  }

  async reservasPorVencer(): Promise<Reservas[]> {

    const fechaHoy = new Date();

    // Listado de reservas por vencer
    const reservas = await this.prisma.reservas.findMany({
      where: {
        estado: 'Pendiente',
        fechaAlerta: {
          lte: fechaHoy
        }
      },
      include: {
        cliente: true,
        creatorUser: true
      }
    })

    return reservas

  }

  async generarComprobante(id: number): Promise<any> {

    const reservaDB = await this.prisma.reservas.findFirst({
      where: { id },
      include: {
        cliente: true,
        reservasProductos: {
          include: {
            producto: {
              include: {
                unidadMedida: true
              }
            }
          }
        }
      }
    });

    if (!reservaDB) throw new NotFoundException('La reserva no existe');

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
                image: this.configService.get('NODE_ENV') === 'production' ? `../assets/Logo.png` : './assets/Logo.png',
                width: 70,
              },
              [
                { text: `Fecha de reserva`, fontSize: 9, marginLeft: 30, marginTop: 10 },
                { text: `${format(reservaDB.fechaReserva, 'dd-MM-yyyy')}`, fontSize: 9, marginLeft: 43, marginTop: 4 },
              ],
            ],
          },
          {
            text: 'EQUINOCCIO TECHNOLOGY',
            marginTop: 10,
            fontSize: 10,
            bold: true,
          },
          {
            text: [
              {
                text: 'Domicilio:',
                bold: true,
              }, ` 9 DE JULIO 811`,
            ],
            marginTop: 5,
            fontSize: 9
          },
          {
            text: [
              {
                text: 'Telefono:',
                bold: true,
              }, ` 2664869642`,
            ],
            marginTop: 7,
            fontSize: 9
          },
          {
            text: '------------------------------------------------',
            marginTop: 5,
          },
          {
            text: [
              {
                text: 'Nro de reserva:',
                bold: true,
              }, ` ${reservaDB.id}`,
            ],
            marginTop: 5,
            fontSize: 9
          },
          {
            text: [
              {
                text: 'Fecha de entrega:',
                bold: true,
              }, ` ${format(reservaDB.fechaEntrega, 'dd/MM/yyyy')} - ${reservaDB.horaEntrega}hs`,
            ],
            marginTop: 5,
            fontSize: 9
          },
          {
            text: [
              {
                text: 'Cliente:',
                bold: true,
              }, ` ${reservaDB.cliente.descripcion}`,
            ],
            marginTop: 5,
            fontSize: 8
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

          reservaDB.reservasProductos.map((producto: any) => {
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

          reservaDB.tipoObservacion === 'Torta' ?
            {
              text: 'Detalles - Torta',
              bold: true,
              fontSize: 11,
              marginTop: 5,
              marginBottom: 2,
            } : { text: [] },

          reservaDB.tipoObservacion === 'Torta' ?
            {
              text: [
                {
                  text: 'Relleno 1:',
                  bold: true,
                }, ` ${reservaDB.tortaRelleno1}`,
              ],
              marginTop: 5,
              fontSize: 9
            } : { text: [] },

          (reservaDB.tipoObservacion === 'Torta' && reservaDB.tortaRelleno2) ?
            {
              text: [
                {
                  text: 'Relleno 2:',
                  bold: true,
                }, ` ${reservaDB.tortaRelleno2}`,
              ],
              marginTop: 5,
              fontSize: 9
            } : { text: [] },

          (reservaDB.tipoObservacion === 'Torta' && reservaDB.tortaRelleno3) ?
            {
              text: [
                {
                  text: 'Relleno 3:',
                  bold: true,
                }, ` ${reservaDB.tortaRelleno3}`,
              ],
              marginTop: 5,
              fontSize: 9
            } : { text: [] },

          reservaDB.tipoObservacion === 'Torta' ?
            {
              text: [
                {
                  text: 'Forma:',
                  bold: true,
                }, ` ${reservaDB.tortaForma}`,
              ],
              marginTop: 5,
              fontSize: 9
            } : { text: [] },

          reservaDB.tipoObservacion === 'Torta' ?
            {
              text: [
                {
                  text: 'Cobertura:',
                  bold: true,
                }, ` ${reservaDB.tortaCobertura}`,
              ],
              marginTop: 5,
              fontSize: 9
            } : { text: [] },

          (reservaDB.tipoObservacion === 'Torta' && reservaDB.tortaDetalles) ?
            {
              text: [
                {
                  text: 'Otros detalles:',
                  bold: true,
                }, ` ${reservaDB.tortaDetalles}`,
              ],
              marginTop: 5,
              lineHeight: 1.5,
              fontSize: 9
            } : { text: [] },

          reservaDB.tipoObservacion === 'Torta' ?
            {
              text: '------------------------------------------------',
              marginTop: 5,
            } : { text: [] },
          {
            text: [
              {
                text: 'Precio total:',
                bold: true,
              }, ` $${reservaDB.precioTotal.toFixed(2)}`,
            ],
            marginTop: 5,
            fontSize: 9
          },
          {
            text: [
              {
                text: 'Monto de seña:',
                bold: true,
              }, ` $${reservaDB.adelanto.toFixed(2)}`,
            ],
            marginTop: 5,
            fontSize: 9
          },
          {
            text: [
              {
                text: 'Falta abonar:',
                bold: true,
              }, ` $${(reservaDB.precioTotal - reservaDB.adelanto).toFixed(2)}`,
            ],
            marginTop: 5,
            fontSize: 9
          },
          {
            text: '------------------------------------------------',
            marginTop: 5,
          },
          {
            text: [
              {
                text: 'Firma de cliente:',
              },
            ],
            marginTop: 10,
            fontSize: 9
          },
          {
            text: '------------------------------------------------',
            marginTop: 10,
          },
          {
            text: [
              {
                text: 'IMPORTANTE',
                bold: true
              },
            ],
            marginTop: 5,
            fontSize: 9
          },
          {
            text: [
              {
                text: 'En caso de que no se retire la mercaderia en la fecha y hora pactada se perdera la seña',
              },
            ],
            marginTop: 5,
            lineHeight: 1.5,
            fontSize: 9
          },
          {
            text: '------------------------------------------------',
            marginTop: 5,
            marginBottom: 5
          },

          // ----------------------------- DUPLICADO ----------------------------------

          {
            columns: [
              {
                image: this.configService.get('NODE_ENV') === 'production' ? `../assets/Logo.png` : './assets/Logo.png',
                width: 70,
              },
              [
                { text: `Fecha de reserva`, fontSize: 9, marginLeft: 30, marginTop: 10 },
                { text: `${format(reservaDB.fechaReserva, 'dd-MM-yyyy')}`, fontSize: 9, marginLeft: 43, marginTop: 4 },
              ],
            ],
          },
          {
            text: 'EQUINOCCIO TECHNOLOGY',
            marginTop: 10,
            fontSize: 10,
            bold: true,
          },
          {
            text: [
              {
                text: 'Domicilio:',
                bold: true,
              }, ` 9 DE JULIO 811`,
            ],
            marginTop: 5,
            fontSize: 9
          },
          {
            text: [
              {
                text: 'Telefono:',
                bold: true,
              }, ` 2664869642`,
            ],
            marginTop: 7,
            fontSize: 9
          },
          {
            text: '------------------------------------------------',
            marginTop: 5,
          },
          {
            text: [
              {
                text: 'Nro de reserva:',
                bold: true,
              }, ` ${reservaDB.id}`,
            ],
            marginTop: 5,
            fontSize: 9
          },
          {
            text: [
              {
                text: 'Fecha de entrega:',
                bold: true,
              }, ` ${format(reservaDB.fechaEntrega, 'dd/MM/yyyy')} - ${reservaDB.horaEntrega}hs`,
            ],
            marginTop: 5,
            fontSize: 9
          },
          {
            text: [
              {
                text: 'Cliente:',
                bold: true,
              }, ` ${reservaDB.cliente.descripcion}`,
            ],
            marginTop: 5,
            fontSize: 8
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

          reservaDB.reservasProductos.map((producto: any) => {
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

          reservaDB.tipoObservacion === 'Torta' ?
            {
              text: 'Detalles - Torta',
              bold: true,
              fontSize: 11,
              marginTop: 5,
              marginBottom: 2,
            } : { text: [] },

          reservaDB.tipoObservacion === 'Torta' ?
            {
              text: [
                {
                  text: 'Relleno 1:',
                  bold: true,
                }, ` ${reservaDB.tortaRelleno1}`,
              ],
              marginTop: 5,
              fontSize: 9
            } : { text: [] },

          (reservaDB.tipoObservacion === 'Torta' && reservaDB.tortaRelleno2) ?
            {
              text: [
                {
                  text: 'Relleno 2:',
                  bold: true,
                }, ` ${reservaDB.tortaRelleno2}`,
              ],
              marginTop: 5,
              fontSize: 9
            } : { text: [] },

          (reservaDB.tipoObservacion === 'Torta' && reservaDB.tortaRelleno3) ?
            {
              text: [
                {
                  text: 'Relleno 3:',
                  bold: true,
                }, ` ${reservaDB.tortaRelleno3}`,
              ],
              marginTop: 5,
              fontSize: 9
            } : { text: [] },

          reservaDB.tipoObservacion === 'Torta' ?
            {
              text: [
                {
                  text: 'Forma:',
                  bold: true,
                }, ` ${reservaDB.tortaForma}`,
              ],
              marginTop: 5,
              fontSize: 9
            } : { text: [] },

          reservaDB.tipoObservacion === 'Torta' ?
            {
              text: [
                {
                  text: 'Cobertura:',
                  bold: true,
                }, ` ${reservaDB.tortaCobertura}`,
              ],
              marginTop: 5,
              fontSize: 9
            } : { text: [] },

          (reservaDB.tipoObservacion === 'Torta' && reservaDB.tortaDetalles) ?
            {
              text: [
                {
                  text: 'Otros detalles:',
                  bold: true,
                }, ` ${reservaDB.tortaDetalles}`,
              ],
              marginTop: 5,
              lineHeight: 1.5,
              fontSize: 9
            } : { text: [] },

          reservaDB.tipoObservacion === 'Torta' ?
            {
              text: '------------------------------------------------',
              marginTop: 5,
            } : { text: [] },
          {
            text: [
              {
                text: 'Precio total:',
                bold: true,
              }, ` $${reservaDB.precioTotal.toFixed(2)}`,
            ],
            marginTop: 5,
            fontSize: 9
          },
          {
            text: [
              {
                text: 'Monto de seña:',
                bold: true,
              }, ` $${reservaDB.adelanto.toFixed(2)}`,
            ],
            marginTop: 5,
            fontSize: 9
          },
          {
            text: [
              {
                text: 'Falta abonar:',
                bold: true,
              }, ` $${(reservaDB.precioTotal - reservaDB.adelanto).toFixed(2)}`,
            ],
            marginTop: 5,
            fontSize: 9
          },
          {
            text: '------------------------------------------------',
            marginTop: 5,
          },
          {
            text: [
              {
                text: 'IMPORTANTE',
                bold: true
              },
            ],
            marginTop: 5,
            fontSize: 9
          },
          {
            text: [
              {
                text: 'En caso de que no se retire la mercaderia en la fecha y hora pactada se perdera la seña',
              },
            ],
            marginTop: 5,
            lineHeight: 1.5,
            fontSize: 9
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

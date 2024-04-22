import { Injectable, NotFoundException } from '@nestjs/common';
import { Cajas, Prisma } from '@prisma/client';
import { add } from 'date-fns';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CajasService {

  constructor(private prisma: PrismaService) { }

  // Caja por ID
  async getId(id: number): Promise<Cajas> {

    const caja = await this.prisma.cajas.findFirst({
      where: { id },
      include: {
        creatorUser: true,
        ingresosCajas: {
          include: {
            tipoIngreso: true,
          }
        },
        gastosCajas: {
          include: {
            tipoGasto: true,
          }
        },
      }
    })

    if (!caja) throw new NotFoundException('La caja no existe');
    return caja;

  }

  // Listar cajas
  async getAll({
    columna = 'id',
    direccion = 'desc',
    activo = '',
    parametro = '',
    pagina = 1,
    fechaDesde = '',
    fechaHasta = '',
    itemsPorPagina = 1000000
  }: any): Promise<any> {

    // Ordenando datos
    let orderBy = {};
    orderBy[columna] = direccion;

    let where: any = {};

    if (activo !== '') where = { ...where, activo: activo === 'true' ? true : false }

    // Total de cajas
    const totalItems = await this.prisma.cajas.count({
      where: {
        ...where,
        fechaCaja: {
          gte: fechaDesde !== '' ? add(new Date(fechaDesde), { hours: 3 }) : new Date('1970-01-01T00:00:00.000Z'),
          lte: fechaHasta !== '' ? add(new Date(fechaHasta), { days: 1, hours: 3 }) : new Date('9000-01-01T00:00:00.000Z'),
        },
      }
    });

    // Listado de cajas
    const cajas = await this.prisma.cajas.findMany({
      take: Number(itemsPorPagina),
      include: {
        creatorUser: true,
      },
      skip: (pagina - 1) * itemsPorPagina,
      orderBy,
      where: {
        ...where,
        fechaCaja: {
          gte: fechaDesde !== '' ? add(new Date(fechaDesde), { hours: 3 }) : new Date('1970-01-01T00:00:00.000Z'),
          lte: fechaHasta !== '' ? add(new Date(fechaHasta), { days: 1, hours: 3 }) : new Date('9000-01-01T00:00:00.000Z'),
        },
      }
    })

    return {
      cajas,
      totalItems,
    };

  }

  // Totales - Caja
  async getTotalesActivos(id: number): Promise<any> {

    // Caja
    const caja = await this.prisma.cajas.findFirst({
      where: { id },
      include: {
        creatorUser: true,
      }
    })

    // Listado de ventas
    const ventas = await this.prisma.ventas.findMany({
      where: { activo: true },
      include: {
        ventasProductos: true,
        ventasFacturacion: true,
        ventasFormasPago: true,
        creatorUser: true,
      }
    })

    // Listado de ingresos
    const ingresos = await this.prisma.ingresosCajas.findMany({
      where: { cajaId: id },
      include: {
        tipoIngreso: true,
        creatorUser: true,
      }
    })

    // Listado de gastos
    const gastos = await this.prisma.gastosCajas.findMany({
      where: { cajaId: id },
      include: {
        tipoGasto: true,
        creatorUser: true,
      }
    })

    let totalIngresos = 0;
    let totalGastos = 0;

    ingresos.map(ingreso => totalIngresos += ingreso.monto);
    gastos.map(gasto => totalGastos += gasto.monto);

    let cantidadVentas = 0;
    let totalBalanza = 0;
    let totalNoBalanza = 0;
    let totalAdicionalCredito = 0;
    let totalEfectivo = 0;
    let totalDebito = 0;
    let totalCredito = 0;
    let totalMercadoPago = 0;
    let totalPedidosYa = 0;
    let totalPedidosYaOnline = 0;
    let totalFacturado = 0;
    let totalAdelantoReserva = 0;
    let totalCompletarReserva = 0;

    ventas.map((venta: any) => {

      cantidadVentas += 1;
      totalBalanza += venta.totalBalanza;
      totalNoBalanza += venta.totalNoBalanza;
      totalAdicionalCredito += venta.adicionalCredito;
      totalAdelantoReserva += venta.totalAdelantoReserva;
      totalCompletarReserva += venta.totalCompletarReserva;

      if (venta.comprobante === 'Fiscal') totalFacturado += venta.precioTotal;

      venta.ventasFormasPago.map(formaPago => {
        if (formaPago.descripcion === 'Efectivo') totalEfectivo += formaPago.valor;
        if (formaPago.descripcion === 'Debito') totalDebito += formaPago.valor;
        if (formaPago.descripcion === 'Credito') totalCredito += formaPago.valor;
        if (formaPago.descripcion === 'Mercado Pago') totalMercadoPago += formaPago.valor;
        if (formaPago.descripcion === 'PedidosYa - Online') totalPedidosYaOnline += formaPago.valor;
        if (formaPago.descripcion === 'PedidosYa - Online' || formaPago.descripcion === 'PedidosYa - Efectivo') totalPedidosYa += formaPago.valor;
      });

    });

    let totalVentas = totalBalanza + totalNoBalanza + totalAdicionalCredito + totalAdelantoReserva + totalCompletarReserva;
    let totalPostnet = totalDebito + totalCredito + totalMercadoPago;
    console.log(totalPostnet);
    let totalEfectivoEnCaja = totalVentas + totalIngresos + caja.saldoInicial - totalPostnet - totalPedidosYaOnline - totalGastos;

    return {
      totales: {
        saldoInicial: caja.saldoInicial,
        cantidadVentas,
        totalBalanza: Number(totalBalanza.toFixed(2)),
        totalNoBalanza: Number(totalNoBalanza.toFixed(2)),
        totalFacturado: Number(totalFacturado.toFixed(2)),
        totalPedidosYa: Number(totalPedidosYa.toFixed(2)),
        totalPedidosYaOnline: Number(totalPedidosYaOnline.toFixed(2)),
        totalAdicionalCredito: Number(totalAdicionalCredito.toFixed(2)),
        totalEfectivo: Number(totalEfectivo.toFixed(2)),
        totalDebito: Number(totalDebito.toFixed(2)),
        totalCredito: Number(totalCredito.toFixed(2)),
        totalMercadoPago: Number(totalMercadoPago.toFixed(2)),
        totalVentas: Number(totalVentas.toFixed(2)),
        totalPostnet: Number(totalPostnet.toFixed(2)),
        totalEfectivoEnCaja: Number(totalEfectivoEnCaja.toFixed(2)),
        totalIngresos: Number(totalIngresos.toFixed(2)),
        totalGastos: Number(totalGastos.toFixed(2)),
        totalAdelantoReserva: Number(totalAdelantoReserva.toFixed(2)),
        totalCompletarReserva: Number(totalCompletarReserva.toFixed(2)),
      },
      ingresos,
      gastos
    };

  }

  // Crear caja
  async insert(createData: Prisma.CajasCreateInput): Promise<Cajas> {

    const cajaActiva = await this.prisma.cajas.findFirst({ where: { activo: true } });

    if (cajaActiva) throw new NotFoundException('Ya existe una caja activa');

    return await this.prisma.cajas.create({ data: createData, include: { creatorUser: true } });

  }

  // Completar caja
  async complete(id: number, updateData: any): Promise<any> {

    const {
      totalEfectivoCajaReal,
      tesoreria,
      fechaCaja,
      creatorUserId,
    } = updateData;

    const cajaDB = await this.prisma.cajas.findFirst({ where: { id } });

    // Verificacion: La caja no existe
    if (!cajaDB) throw new NotFoundException('La caja no existe');

    // Verificacion: La caja no esta activa
    if (cajaDB.activo === false) throw new NotFoundException('La caja ya fue cerrada');

    const { totales } = await this.getTotalesActivos(id);
    const {
      saldoInicial,
      cantidadVentas,
      totalBalanza,
      totalNoBalanza,
      totalFacturado,
      totalPedidosYa,
      totalPedidosYaOnline,
      totalAdicionalCredito,
      totalEfectivo,
      totalDebito,
      totalCredito,
      totalMercadoPago,
      totalVentas,
      totalPostnet,
      totalEfectivoEnCaja,
      totalIngresos,
      totalGastos,
    } = totales;

    let saldoProximaCaja = Number((totalEfectivoCajaReal - tesoreria).toFixed(2));
    let diferencia = Number((totalEfectivoCajaReal - totalEfectivoEnCaja).toFixed(2));

    // Se ajusta la fecha de la caja
    let fechaCajaAdj = new Date(fechaCaja);
    fechaCajaAdj.setHours(fechaCajaAdj.getHours() + 3);

    const data = {
      saldoInicial,
      cantidadVentas,
      totalBalanza,
      totalNoBalanza,
      totalFacturado,
      totalPedidosYa,
      totalPedidosYaOnline,
      totalAdicionalCredito,
      totalEfectivo,
      totalDebito,
      totalCredito,
      totalMercadoPago,
      totalVentas,
      totalPostnet,
      totalEfectivoEnCaja,
      totalOtrosIngresos: totalIngresos,
      totalOtrosGastos: totalGastos,
      totalEfectivoEnCajaReal: Number(totalEfectivoCajaReal.toFixed(2)),
      tesoreria,
      diferencia,
      saldoProximaCaja,
      fechaCaja: fechaCajaAdj,
      creatorUserId,
      activo: false
    }

    // Actualizar caja - CIERRE DE CAJA
    await this.prisma.cajas.update({
      where: { id },
      data,
      include: {
        creatorUser: true
      }
    })

    // Cadena de bajas
    await Promise.all([
      await this.prisma.ingresosCajas.updateMany({ where: { cajaId: id, activo: true }, data: { activo: false } }),
      await this.prisma.gastosCajas.updateMany({ where: { cajaId: id, activo: true }, data: { activo: false } }),
      await this.prisma.ventas.updateMany({ where: { activo: true }, data: { activo: false } }),
    ])

    // Se activa la nueva caja
    const nuevaCaja = await this.prisma.cajas.create({
      data: {
        saldoInicial: saldoProximaCaja,
        creatorUserId,
      },
      include: {
        creatorUser: true
      }
    });

    return nuevaCaja;

  }

  // Actualizar caja
  async update(id: number, updateData: any): Promise<Cajas> {

    const cajaDB = await this.prisma.cajas.findFirst({ where: { id } });

    if(updateData.fechaCaja){
      updateData.fechaCaja = new Date(updateData.fechaCaja);
      updateData.fechaCaja.setHours(updateData.fechaCaja.getHours() + 3);
    }

    // Verificacion: La caja no existe
    if (!cajaDB) throw new NotFoundException('La caja no existe');

    return await this.prisma.cajas.update({
      where: { id },
      data: updateData,
      include: {
        creatorUser: true
      }
    })

  }

}

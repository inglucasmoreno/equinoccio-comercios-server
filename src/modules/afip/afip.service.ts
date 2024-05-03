import { Injectable } from '@nestjs/common';
import afip from '@afipsdk/afip.js';
import fs from 'fs';
import { last } from 'rxjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AfipService {

  constructor(private prisma: PrismaService) { }

  public ptoVenta = 1;

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

  // Generar certificado - Desarrollo
  async generarCertificadoDesarrollo(): Promise<any> {

    // Datos para generacion de certificado
    const CUIT = 20176652536;
    const username = '';
    const password = '';
    const alias = '';
    // const res = await this.afip.CreateCert(username, password, alias);
    // console.log(res.cert);
    // console.log(res.key);

  }

  // Factura tipo A -> De Responsable Inscripto a Responsable inscripto
  async facturacionTipoA(): Promise<any> {

    await this.afipConnection();

    // DATOS PARA FACTURACION

    const tipoFactura = 1;                                            // Factura B
    let concepto = 1;                                                 // 1 - Producto; 2 - Servicio; 3 - Producto y Servicio
    const tipoDocumento = 80;                                         // Consumidor Final = 99
    const nroDocumento = 33693450239;                                 // Consumidor Final = 0
    const lastVoucher = await this.afipInstance.ElectronicBilling.getLastVoucher(this.ptoVenta, tipoFactura);
    const nroFactura = lastVoucher + 1;
    const fecha = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    // Importe sujeto al IVA (Sin incluir IVA)
    const importeGravado = 1000;

    // Importe exento al IVA
    const importeExentoIVA = 0;

    // Importe de IVA
    const importeIVA = 210;

    /**
     * Los siguientes campos solo son obligatorios para los conceptos 2 y 3
     **/

    let fechaServicioDesde = null, fechaServicioHasta = null, fechaVencimientoPago = null;

    if (concepto === 2 || concepto === 3) {
      /**
       * Fecha de inicio de servicio en formato aaaammdd
       **/
      const fechaServicioDesde = 20191213;

      /**
       * Fecha de fin de servicio en formato aaaammdd
       **/
      const fechaServicioHasta = 20191213;

      /**
       * Fecha de vencimiento del pago en formato aaaammdd
       **/
      const fechaVencimientoPago = 20191213;
    }

    const dataFacturacion = {
      'CantReg': 1, // Cantidad de facturas a registrar
      'PtoVta': this.ptoVenta,
      'CbteTipo': tipoFactura,
      'Concepto': concepto,
      'DocTipo': tipoDocumento,
      'DocNro': nroDocumento,
      'CbteDesde': nroFactura,
      'CbteHasta': nroFactura,
      'CbteFch': parseInt(fecha.replace(/-/g, '')),
      'FchServDesde': fechaServicioDesde,
      'FchServHasta': fechaServicioHasta,
      'FchVtoPago': fechaVencimientoPago,
      'ImpTotal': importeGravado + importeIVA + importeExentoIVA,
      'ImpTotConc': 0, // Importe neto no gravado
      'ImpNeto': importeGravado,
      'ImpOpEx': importeExentoIVA,
      'ImpIVA': importeIVA,
      'ImpTrib': 0, //Importe total de tributos
      'MonId': 'PES', //Tipo de moneda usada en la factura ('PES' = pesos argentinos) 
      'MonCotiz': 1, // Cotización de la moneda usada (1 para pesos argentinos)  
      'Iva': [ // Alícuotas asociadas a la factura
        {
          'Id': 5, // Id del tipo de IVA (5 = 21%)
          'BaseImp': importeGravado,
          'Importe': importeIVA
        }
      ]
    };

    // Se genera la factura
    const respuesta = await this.afipInstance.ElectronicBilling.createVoucher(dataFacturacion);

    console.log({
      'CAE': respuesta.CAE, // CAE asignado a la factura
      'vencimiento': respuesta.CAEFchVto, // Fecha de vencimiento del CAE
    })

    return respuesta;

  }


  // Factura tipo B -> De Responsable Inscripto a Consumidor Final
  async facturacionTipoB(): Promise<any> {

    await this.afipConnection();

    // DATOS PARA FACTURACION

    const tipoFactura = 6;        // Factura B
    let concepto = 1;           // 1 - Producto; 2 - Servicio; 3 - Producto y Servicio
    const tipoDocumento = 99;     // Consumidor Final = 99
    const nroDocumento = 0;    // Consumidor Final = 0
    const lastVoucher = await this.afipInstance.ElectronicBilling.getLastVoucher(this.ptoVenta, tipoFactura);
    const nroFactura = lastVoucher + 1;
    const fecha = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    // Importe sujeto al IVA (Sin incluir IVA)
    const importeGravado = 1000;

    // Importe exento al IVA
    const importeExentoIVA = 0;

    // Importe de IVA
    const importeIVA = 210;

    /**
     * Los siguientes campos solo son obligatorios para los conceptos 2 y 3
     **/

    let fechaServicioDesde = null, fechaServicioHasta = null, fechaVencimientoPago = null;

    if (concepto === 2 || concepto === 3) {
      /**
       * Fecha de inicio de servicio en formato aaaammdd
       **/
      const fechaServicioDesde = 20191213;

      /**
       * Fecha de fin de servicio en formato aaaammdd
       **/
      const fechaServicioHasta = 20191213;

      /**
       * Fecha de vencimiento del pago en formato aaaammdd
       **/
      const fechaVencimientoPago = 20191213;
    }

    const dataFacturacion = {
      'CantReg': 1, // Cantidad de facturas a registrar
      'PtoVta': this.ptoVenta,
      'CbteTipo': tipoFactura,
      'Concepto': concepto,
      'DocTipo': tipoDocumento,
      'DocNro': nroDocumento,
      'CbteDesde': nroFactura,
      'CbteHasta': nroFactura,
      'CbteFch': parseInt(fecha.replace(/-/g, '')),
      'FchServDesde': fechaServicioDesde,
      'FchServHasta': fechaServicioHasta,
      'FchVtoPago': fechaVencimientoPago,
      'ImpTotal': importeGravado + importeIVA + importeExentoIVA,
      'ImpTotConc': 0, // Importe neto no gravado
      'ImpNeto': importeGravado,
      'ImpOpEx': importeExentoIVA,
      'ImpIVA': importeIVA,
      'ImpTrib': 0, //Importe total de tributos
      'MonId': 'PES', //Tipo de moneda usada en la factura ('PES' = pesos argentinos) 
      'MonCotiz': 1, // Cotización de la moneda usada (1 para pesos argentinos)  
      'Iva': [ // Alícuotas asociadas a la factura
        {
          'Id': 5, // Id del tipo de IVA (5 = 21%)
          'BaseImp': importeGravado,
          'Importe': importeIVA
        }
      ]
    };

    // Se genera la factura
    const respuesta = await this.afipInstance.ElectronicBilling.createVoucher(dataFacturacion);

    console.log({
      'CAE': respuesta.CAE, // CAE asignado a la factura
      'vencimiento': respuesta.CAEFchVto, // Fecha de vencimiento del CAE
    })

    return respuesta;

  }

  // Obtener datos de comprobante - Tipo B
  async obtenerComprobanteTipoB(nroComprobante = 1): Promise<any> {
    await this.afipConnection();
    const tipoComprobante = 6;
    const comprobante = await this.afipInstance.ElectronicBilling.getVoucherInfo(nroComprobante, this.ptoVenta, tipoComprobante);
    return comprobante;
  }

  // Ultimo numero de factura
  async ultimoNumeroFactura(tipoFactura = 11): Promise<any> {
    await this.afipConnection();
    const ultimoNumero = await this.afipInstance.ElectronicBilling.getLastVoucher(this.ptoVenta, tipoFactura);
    return ultimoNumero;
  }

  // Constancia de inscripcion
  async constanciaInscripcion(CUIT = 20119010676): Promise<any> {
    if (!CUIT) throw new Error('Debe ingresar un CUIT');
    await this.afipConnection();
    const datosContribuyente = await this.afipInstance.RegisterInscriptionProof.getTaxpayerDetails(CUIT);
    return datosContribuyente;
  }

  // Estado de servidor AFIP
  async estadoServidor(): Promise<any> {
    await this.afipConnection();
    const serverStatus = await this.afipInstance.RegisterInscriptionProof.getServerStatus();
    return serverStatus;
  }

}





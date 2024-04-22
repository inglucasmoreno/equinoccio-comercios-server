import { Body, Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { AfipService } from './afip.service';

@Controller('afip')
export class AfipController {

  constructor( private readonly afipService: AfipService ){}


  @Get('/generar-certificado-desarrollo')
  async generarCertificadoDesarrollo(@Res() res): Promise<any> {

    const respuesta = await this.afipService.generarCertificadoDesarrollo();
    
    return res.status(HttpStatus.OK).json({
      respuesta,
      success: true,
      message: 'Certificado generado correctamente',
    })

  }

  @Get('/obtener-comprobante-tipo-b/:nroComprobante')
  async obtenerComprobanteTipoB(@Res() res, @Param('nroComprobante') nroComprobante: number): Promise<any> {

    const comprobante = await this.afipService.obtenerComprobanteTipoB(nroComprobante);
    
    return res.status(HttpStatus.OK).json({
      comprobante,
      success: true,
      message: 'Comprobante obtenido correctamente',
    })

  }

  @Get('/ultimo-numero-factura/:nroFactura')
  async ultimoNumeroFactura(@Res() res, @Param('nroFactura') nroFactura: number): Promise<any> {

    const respuesta = await this.afipService.ultimoNumeroFactura(nroFactura);
    
    return res.status(HttpStatus.OK).json({
      respuesta,
      success: true,
      message: 'Numero de factura obtenido correctamente',
    })

  }

  @Get('/constancia-inscripcion/:cuit')
  async constanciaInscripcion(@Res() res, @Param('cuit') cuit: number): Promise<any> {

    const constancia = await this.afipService.constanciaInscripcion(cuit);
    
    return res.status(HttpStatus.OK).json({
      constancia,
      success: true,
      message: 'Constancia obtenida correctamente',
    });

  }

  @Get('/estado-servidor')
  async estadoServidor(@Res() res): Promise<any> {

    const estado = await this.afipService.estadoServidor();
    
    return res.status(HttpStatus.OK).json({
      estado,
      success: true,
      message: 'Estado de servidor',
    })

  }

  @Get('/facturacion-tipo-b')
  async facturacionTipoB(@Res() res): Promise<any> {

    const respuesta = await this.afipService.facturacionTipoB();
    
    return res.status(HttpStatus.OK).json({
      respuesta,
      success: true,
      message: 'Facturacion Tipo B - Realizada correctamente',
    })

  }

}

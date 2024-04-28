import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('ventas')
export class VentasController {

    constructor(private readonly ventasService: VentasService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getId(@Res() res, @Param('id') id: number): Promise<any> {

        const venta = await this.ventasService.getId(id);

        return res.status(HttpStatus.OK).json({
            success: true,
            message: 'Venta obtenida correctamente',
            venta
        })

    }

    @UseGuards(JwtAuthGuard)
    @Get('/afip/proximo-numero-factura/:tipoFactura')
    async proximoNumeroFactura(@Res() res, @Param('tipoFactura') tipoFactura: string): Promise<any> {

        const proximoNumeroFactura = await this.ventasService.proximoNumeroFactura(tipoFactura);

        return res.status(HttpStatus.OK).json({
            success: true,
            message: 'Proximo numero de factura obtenido correctamente',
            proximoNumeroFactura
        })

    }

    // @UseGuards(JwtAuthGuard)
    @Get('generar/comprobante/:id')
    async generarComprobante(@Res() res, @Param('id') id: number): Promise<any> {

        const buffer = await this.ventasService.generarComprobante(id);

        // res.set({
        //     'Content-Type': 'application/pdf',
        //     'Content-Disposition': 'attachment; filename-example.pdf',
        //     'Content-Length': buffer.length
        // })

        res.end(buffer);

    }

    // @UseGuards(JwtAuthGuard)
    @Get('generar/comprobante/fiscal/:id')
    async generarComprobanteFiscal(@Res() res, @Param('id') id: number): Promise<any> {

        const buffer = await this.ventasService.generarComprobanteFiscal(id);

        // res.set({
        //     'Content-Type': 'application/pdf',
        //     'Content-Disposition': 'attachment; filename-example.pdf',
        //     'Content-Length': buffer.length
        // })

        res.end(buffer);

    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@Res() res, @Query() query): Promise<any> {

        const { ventas, totales, totalItems } = await this.ventasService.getAll(query);

        return res.status(HttpStatus.OK).json({
            success: true,
            message: 'Ventas obtenidas correctamente',
            ventas,
            totalItems,
            totales
        })

    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async insert(@Res() res, @Body() createData: any): Promise<any> {

        const venta = await this.ventasService.insert(createData);

        return res.status(HttpStatus.CREATED).json({
            success: true,
            message: 'Venta creada correctamente',
            venta
        })

    }

    @UseGuards(JwtAuthGuard)
    @Post('/facturacion-b')
    async insertFacturacionB(@Res() res, @Body() createData: any): Promise<any> {

        const venta = await this.ventasService.insertFacturacion(createData);

        return res.status(HttpStatus.CREATED).json({
            success: true,
            message: 'Venta creada correctamente',
            venta
        })

    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.VentasUpdateInput) {

        const venta = await this.ventasService.update(id, dataUpdate);

        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Venta actualizada correctamente',
            venta
        })

    }

    @UseGuards(JwtAuthGuard)
    @Patch('/facturacion-b/:id')
    async updateFacturacionB(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.VentasUpdateInput) {

        const venta = await this.ventasService.updateFacturacion(id, dataUpdate);

        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Venta facturada correctamente',
            venta
        })

    }

}

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
    @Get()
    async getAll(@Res() res, @Query() query): Promise<any> {

        const { ventas, totalItems } = await this.ventasService.getAll(query);

        return res.status(HttpStatus.OK).json({
            success: true,
            message: 'Ventas obtenidas correctamente',
            ventas,
            totalItems
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
    @Patch(':id')
    async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.VentasUpdateInput) {

        const venta = await this.ventasService.update(id, dataUpdate);

        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Venta actualizada correctamente',
            venta
        })

    }

}

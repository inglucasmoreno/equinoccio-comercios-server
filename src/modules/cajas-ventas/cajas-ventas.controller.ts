import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { CajasVentasService } from './cajas-ventas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('cajas-ventas')
export class CajasVentasController {

    constructor(private readonly relacionesService: CajasVentasService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getId(@Res() res, @Param('id') id: number): Promise<any> {

        const relacion = await this.relacionesService.getId(id);

        return res.status(HttpStatus.OK).json({
            success: true,
            message: 'Relacion obtenida correctamente',
            relacion
        })

    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@Res() res, @Query() query): Promise<any> {

        const { relaciones, totalItems } = await this.relacionesService.getAll(query);

        return res.status(HttpStatus.OK).json({
            success: true,
            message: 'Relaciones obtenidas correctamente',
            relaciones,
            totalItems
        })

    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async insert(@Res() res, @Body() createData: Prisma.CajasVentasCreateInput): Promise<any> {

        const relacion = await this.relacionesService.insert(createData);

        return res.status(HttpStatus.CREATED).json({
            success: true,
            message: 'Relacion creada correctamente',
            relacion
        })

    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.CajasVentasUpdateInput) {

        const relacion = await this.relacionesService.update(id, dataUpdate);

        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Relacion actualizada correctamente',
            relacion
        })

    }

}

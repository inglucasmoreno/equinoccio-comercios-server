import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { GastosCajasService } from './gastos-cajas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('gastos-cajas')
export class GastosCajasController {

    constructor(private readonly gastosService: GastosCajasService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getId(@Res() res, @Param('id') id: number): Promise<any> {

        const gasto = await this.gastosService.getId(id);

        return res.status(HttpStatus.OK).json({
            success: true,
            message: 'Gasto obtenido correctamente',
            gasto
        })

    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@Res() res, @Query() query): Promise<any> {

        const { gastos, totalItems } = await this.gastosService.getAll(query);

        return res.status(HttpStatus.OK).json({
            success: true,
            message: 'Gastos obtenidos correctamente',
            gastos,
            totalItems
        })

    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async insert(@Res() res, @Body() createData: Prisma.GastosCajasCreateInput): Promise<any> {

        const gasto = await this.gastosService.insert(createData);

        return res.status(HttpStatus.CREATED).json({
            success: true,
            message: 'Gasto creado correctamente',
            gasto
        })

    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.GastosCajasUpdateInput) {

        const gasto = await this.gastosService.update(id, dataUpdate);

        res.status(HttpStatus.OK).json({
            success: true,
            message: 'Gasto actualizado correctamente',
            gasto
        })

    }

}

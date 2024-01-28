import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { CajasService } from './cajas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('cajas')
export class CajasController {

  constructor(private readonly cajasService: CajasService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getId(@Res() res, @Param('id') id: number): Promise<any> {

    const caja = await this.cajasService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Caja obtenida correctamente',
      caja
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get('totales/activos/:id')
  async getTotalesActivos(@Res() res, @Param('id') id: number): Promise<any> {

    console.log(id);

    const {totales, ingresos, gastos }= await this.cajasService.getTotalesActivos(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Totales obtenidos correctamente',
      totales,
      ingresos,
      gastos
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res, @Query() query): Promise<any> {

    const { cajas, totalItems } = await this.cajasService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Cajas obtenidas correctamente',
      cajas,
      totalItems
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Res() res, @Body() createData: Prisma.CajasCreateInput): Promise<any> {

    const caja = await this.cajasService.insert(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Caja creada correctamente',
      caja
    })

  }

  @UseGuards(JwtAuthGuard)
  @Patch('complete/:id')
  async complete(@Res() res, @Param('id') id: number, @Body() dataUpdate: any) {

    const caja = await this.cajasService.complete(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Caja completada correctamente',
      caja
    })

  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.CajasUpdateInput) {

    const caja = await this.cajasService.update(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Caja actualizada correctamente',
      caja
    })

  }

}

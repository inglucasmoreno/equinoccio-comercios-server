import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ReservasProductosService } from './reservas-productos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('reservas-productos')
export class ReservasProductosController {

  constructor(private readonly reservasProductosService: ReservasProductosService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getId(@Res() res, @Param('id') id: number): Promise<any> {

    const reservaProducto = await this.reservasProductosService.getId(id);
    
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'ReservaProducto obtenida correctamente',
      reservaProducto
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res, @Query() query): Promise<any> {
    
    const {reservasProductos, totalItems} = await this.reservasProductosService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'ReservasProductos obtenidas correctamente',
      reservasProductos,
      totalItems   
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Res() res, @Body() createData: Prisma.ReservasProductosCreateInput): Promise<any> {

    const reservaProducto = await this.reservasProductosService.insert(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'ReservaProducto creada correctamente',
      reservaProducto
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.ReservasProductosUpdateInput){

    const ReservaProducto = await this.reservasProductosService.update(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'ReservaProducto actualizada correctamente',
      ReservaProducto
    })

  }

}

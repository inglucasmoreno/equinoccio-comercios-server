import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { VentasReservasService } from './ventas-reservas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('ventas-reservas')
export class VentasReservasController {

  constructor(private readonly ventasReservasService: VentasReservasService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getId(@Res() res, @Param('id') id: number): Promise<any> {

    const ventaReserva = await this.ventasReservasService.getId(id);
    
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'VentaReserva obtenida correctamente',
      ventaReserva      
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res, @Query() query): Promise<any> {
    
    const {ventasReservas, totalItems} = await this.ventasReservasService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'VentasReservas obtenidas correctamente',
      ventasReservas,
      totalItems   
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Res() res, @Body() createData: Prisma.VentasReservasCreateInput): Promise<any> {

    const ventaReserva = await this.ventasReservasService.insert(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'VentaReserva creada correctamente',
      ventaReserva
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.VentasReservasUpdateInput){

    const ventaReserva = await this.ventasReservasService.update(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'VentaReserva actualizada correctamente',
      ventaReserva
    })

  }

}

import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('reservas')
export class ReservasController {

  constructor(private readonly reservasService: ReservasService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getId(@Res() res, @Param('id') id: number): Promise<any> {

    const reserva = await this.reservasService.getId(id);
    
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Reserva obtenida correctamente',
      reserva      
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res, @Query() query): Promise<any> {
    
    const {reservas, totalItems} = await this.reservasService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Reservas obtenidas correctamente',
      reservas,
      totalItems   
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get('/estado/por-vencer')
  async getReservasPorVencer(@Res() res): Promise<any> {
    
    const reservas = await this.reservasService.reservasPorVencer();

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Reservas por vencer obtenidas correctamente',
      reservas,
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Res() res, @Body() createData: any): Promise<any> {
    
    const reserva = await this.reservasService.insert(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Reserva creada correctamente',
      reserva
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.ReservasUpdateInput){

    const reserva = await this.reservasService.update(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Reserva actualizada correctamente',
      reserva
    })

  }

}

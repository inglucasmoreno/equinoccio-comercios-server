import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ReservasObservacionesTortasService } from './reservas-observaciones-tortas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('reservas-observaciones-tortas')
export class ReservasObservacionesTortasController {

  constructor(private readonly observacionesTortasService: ReservasObservacionesTortasService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getId(@Res() res, @Param('id') id: number): Promise<any> {

    const observacion = await this.observacionesTortasService.getId(id);
    
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Observacion obtenida correctamente',
      observacion
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res, @Query() query): Promise<any> {
    
    const {observacionesTortas, totalItems} = await this.observacionesTortasService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Observacion obtenidas correctamente',
      observacionesTortas,
      totalItems   
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Res() res, @Body() createData: Prisma.ReservasObservacionesTortasCreateInput): Promise<any> {

    const observacionesTortas = await this.observacionesTortasService.insert(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Observacion creada correctamente',
      observacionesTortas
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.ReservasObservacionesTortasUpdateInput){

    const observacion = await this.observacionesTortasService.update(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Observacion actualizada correctamente',
      observacion
    })

  }

}

import { Controller, UseGuards, Get, Res, Param, HttpStatus, Query, Post, Body, Patch } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('ingresos')
export class IngresosController {

  constructor(
    private readonly ingresosService: IngresosService
  ){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getId(@Res() res, @Param('id') id: number): Promise<any> {

    const ingreso = await this.ingresosService.getId(id);
    
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Ingreso obtenido correctamente',
      ingreso      
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res, @Query() query): Promise<any> {
    
    const {ingresos, totalItems} = await this.ingresosService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Ingresos obtenidos correctamente',
      ingresos,
      totalItems   
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Res() res, @Body() createData: Prisma.IngresosCreateInput): Promise<any> {

    const ingreso = await this.ingresosService.insert(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Ingreso creado correctamente',
      ingreso
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch('completar/:id')
  async completar(@Res() res, @Body() updateData: any, @Param('id') id: number): Promise<any> {

    const ingreso = await this.ingresosService.completar(id, updateData);
    
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Ingreso obtenido correctamente',
      ingreso
    })

  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.IngresosUpdateInput){

    const ingreso = await this.ingresosService.update(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Ingreso actualizado correctamente',
      ingreso
    })

  }

}

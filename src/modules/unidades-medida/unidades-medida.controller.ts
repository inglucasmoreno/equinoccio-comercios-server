import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { UnidadesMedidaService } from './unidades-medida.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('unidades-medida')
export class UnidadesMedidaController {

  constructor(private readonly unidadesMedidaService: UnidadesMedidaService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getId(@Res() res, @Param('id') id: number): Promise<any> {

    const unidad = await this.unidadesMedidaService.getId(id);
    
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Unidad obtenida correctamente',
      unidad      
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res, @Query() query): Promise<any> {
    
    const {unidades, totalItems} = await this.unidadesMedidaService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Unidades obtenidas correctamente',
      unidades,
      totalItems   
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Res() res, @Body() createData: Prisma.UnidadesMedidaCreateInput): Promise<any> {

    const unidad = await this.unidadesMedidaService.insert(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Unidad creada correctamente',
      unidad
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.UnidadesMedidaUpdateInput){

    const unidad = await this.unidadesMedidaService.update(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Unidad actualizada correctamente',
      unidad
    })

  }

}

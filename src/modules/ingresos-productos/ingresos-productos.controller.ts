import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { IngresosProductosService } from './ingresos-productos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('ingresos-productos')
export class IngresosProductosController {

  constructor(private readonly ingresosProductosService: IngresosProductosService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getId(@Res() res, @Param('id') id: number): Promise<any> {

    const relacion = await this.ingresosProductosService.getId(id);
    
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Relacion obtenida correctamente',
      relacion      
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res, @Query() query): Promise<any> {
    
    const {relaciones, totalItems} = await this.ingresosProductosService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Relaciones obtenidas correctamente',
      relaciones,
      totalItems
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Res() res, @Body() createData: Prisma.IngresosProductosCreateInput): Promise<any> {

    const relacion = await this.ingresosProductosService.insert(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Relacion creada correctamente',
      relacion
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.IngresosProductosUpdateInput){

    const relacion = await this.ingresosProductosService.update(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Relacion actualizada correctamente',
      relacion
    })

  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async eliminar(@Res() res, @Param('id') id: number){

    await this.ingresosProductosService.delete(id);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Producto eliminado correctamente',
    })

  }

}

import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VentasProductosService } from './ventas-productos.service';

@Controller('ventas-productos')
export class VentasProductosController {

    constructor(private readonly ventasProductosService: VentasProductosService){}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getId(@Res() res, @Param('id') id: number): Promise<any> {
  
      const relacion = await this.ventasProductosService.getId(id);
      
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Relacion obtenida correctamente',
        relacion      
      })
  
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@Res() res, @Query() query): Promise<any> {
      
      const {relaciones, totalItems} = await this.ventasProductosService.getAll(query);
  
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Relaciones obtenidas correctamente',
        relaciones,
        totalItems   
      })
  
    }
  
    @UseGuards(JwtAuthGuard)
    @Post()
    async insert(@Res() res, @Body() createData: Prisma.VentasProductosCreateInput): Promise<any> {
  
      const relacion = await this.ventasProductosService.insert(createData);
  
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Relacion creada correctamente',
        relacion
      })
    
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.VentasProductosUpdateInput){
  
      const relacion = await this.ventasProductosService.update(id, dataUpdate);
  
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Relacion actualizada correctamente',
        relacion
      })
  
    }

}

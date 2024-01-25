import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { TiposIngresosService } from './tipos-ingresos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('tipos-ingresos')
export class TiposIngresosController {


    constructor(private readonly tiposIngresosService: TiposIngresosService){}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getId(@Res() res, @Param('id') id: number): Promise<any> {
  
      const tipo = await this.tiposIngresosService.getId(id);
      
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Tipo obtenido correctamente',
        tipo   
      })
  
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@Res() res, @Query() query): Promise<any> {
      
      const {tipos, totalItems} = await this.tiposIngresosService.getAll(query);
  
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Tipos obtenidos correctamente',
        tipos,
        totalItems   
      })
  
    }
  
    @UseGuards(JwtAuthGuard)
    @Post()
    async insert(@Res() res, @Body() createData: Prisma.TiposIngresosCreateInput): Promise<any> {
  
      const tipo = await this.tiposIngresosService.insert(createData);
  
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Tipo creado correctamente',
        tipo
      })
    
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.TiposIngresosUpdateInput){
  
      const tipo = await this.tiposIngresosService.update(id, dataUpdate);
  
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Tipo actualizado correctamente',
        tipo
      })
  
    }

}

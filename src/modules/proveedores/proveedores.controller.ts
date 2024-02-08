import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('proveedores')
export class ProveedoresController {

  constructor(private readonly proveedoresService: ProveedoresService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getId(@Res() res, @Param('id') id: number): Promise<any> {

    const proveedor = await this.proveedoresService.getId(id);
    
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Proveedor obtenido correctamente',
      proveedor      
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res, @Query() query): Promise<any> {
    
    const {proveedores, totalItems} = await this.proveedoresService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Proveedores obtenidos correctamente',
      proveedores,
      totalItems   
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Res() res, @Body() createData: Prisma.ProveedoresCreateInput): Promise<any> {

    const proveedor = await this.proveedoresService.insert(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Proveedor creado correctamente',
      proveedor
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.ProveedoresUpdateInput){

    const proveedor = await this.proveedoresService.update(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Proveedor actualizado correctamente',
      proveedor
    })

  }

}

import { Controller, UseGuards, Get, Res, Param, HttpStatus, Query, Post, Body, Patch } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('marcas')
export class MarcasController {

  constructor(private readonly marcasService: MarcasService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getId(@Res() res, @Param('id') id: number): Promise<any> {

    const marca = await this.marcasService.getId(id);
    
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Marca obtenida correctamente',
      marca      
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res, @Query() query): Promise<any> {
    
    const {marcas, totalItems} = await this.marcasService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Marcas obtenidas correctamente',
      marcas,
      totalItems   
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Res() res, @Body() createData: Prisma.MarcasCreateInput): Promise<any> {

    const marca = await this.marcasService.insert(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Marca creada correctamente',
      marca
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.MarcasUpdateInput){

    const marca = await this.marcasService.update(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Marca actualizada correctamente',
      marca
    })

  }

}

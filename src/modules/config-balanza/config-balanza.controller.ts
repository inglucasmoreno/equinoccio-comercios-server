import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ConfigBalanzaService } from './config-balanza.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('config-balanza')
export class ConfigBalanzaController {

  constructor(private readonly configBalanzaService: ConfigBalanzaService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getId(@Res() res, @Param('id') id: number): Promise<any> {

    const configBalanza = await this.configBalanzaService.getId(id);
    
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'ConfigBalanza obtenida correctamente',
      configBalanza
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res, @Query() query): Promise<any> {
    
    const {configBalanza} = await this.configBalanzaService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'ConfigBalanza obtenidas correctamente',
      configBalanza
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Res() res, @Body() createData: Prisma.ConfigBalanzaCreateInput): Promise<any> {

    const configBalanza = await this.configBalanzaService.insert(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'ConfigBalanza creada correctamente',
      configBalanza
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.ConfigBalanzaUpdateInput){

    const configBalanza = await this.configBalanzaService.update(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'ConfigBalanza actualizada correctamente',
      configBalanza
    })

  }

}

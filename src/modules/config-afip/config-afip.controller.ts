import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigAfipService } from './config-afip.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('config-afip')
export class ConfigAfipController {

  constructor(private readonly configAfipService: ConfigAfipService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getConfiguraciones(@Res() res): Promise<any> {

    const configuraciones = await this.configAfipService.getConfiguraciones();

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Configuraciones obtenidas correctamente',
      configuraciones
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async crearConfiguraciones(@Res() res, @Body() createData: any): Promise<any> {

    const configuraciones = await this.configAfipService.crearConfiguraciones(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Configuraciones creadas correctamente',
      configuraciones
    })

  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async actualizarConfiguraciones(@Res() res, @Param('id') id: number, @Body() dataUpdate: any){

    const configuraciones = await this.configAfipService.actualizarConfiguraciones(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Configuraciones actualizadas correctamente',
      configuraciones
    })

  }



}

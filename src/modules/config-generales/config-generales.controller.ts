import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigGeneralesService } from './config-generales.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('config-generales')
export class ConfigGeneralesController {

  constructor(private readonly configGeneralesService: ConfigGeneralesService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getId(@Res() res, @Param('id') id: number): Promise<any> {

    const configGeneral = await this.configGeneralesService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'ConfigGeneral obtenida correctamente',
      configGeneral
    })

  }

  @Get()
  async getAll(@Res() res, @Query() query): Promise<any> {

    const { configGeneral } = await this.configGeneralesService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'ConfigGeneral obtenidas correctamente',
      configGeneral
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Res() res, @Body() createData: Prisma.ConfigGeneralesCreateInput): Promise<any> {

    const configGeneral = await this.configGeneralesService.insert(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'ConfigGeneral creada correctamente',
      configGeneral
    })

  }

  // Subir imagen
  @Post('/logoEmpresa')
  @UseInterceptors(
    FileInterceptor(
      'file',
      {
        storage: diskStorage({
          // destination: './public/img',
          destination: './public/files/img',
          filename: function (req, file, cb) {
            cb(null, 'Logo.png');
          }
        })
      }
    )
  )
  async subirImagen(@Res() res, @UploadedFile() file: Express.Multer.File, @Body() info: any) {
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Logo actualizado correctamente',
    })
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.ConfigGeneralesUpdateInput) {

    const configGeneral = await this.configGeneralesService.update(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'ConfigGeneral actualizada correctamente',
      configGeneral
    })

  }

}

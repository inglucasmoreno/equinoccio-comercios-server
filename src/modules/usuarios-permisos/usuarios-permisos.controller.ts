import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { UsuariosPermisosService } from './usuarios-permisos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('usuarios-permisos')
export class UsuariosPermisosController {

  constructor(private readonly usuariosPermisosService: UsuariosPermisosService){}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getId(@Res() res, @Param('id') id: number): Promise<any> {

    const permiso = await this.usuariosPermisosService.getId(id);
    
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Permiso obtenido correctamente',
      permiso  
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res, @Query() query): Promise<any> {
    
    const {permisos, totalItems} = await this.usuariosPermisosService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Permisos obtenidos correctamente',
      permisos,
      totalItems   
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Res() res, @Body() createData: Prisma.UsuariosPermisosCreateInput): Promise<any> {

    const permiso = await this.usuariosPermisosService.insert(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Permiso creado correctamente',
      permiso
    })
  
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.UsuariosPermisosUpdateInput){

    const permiso = await this.usuariosPermisosService.update(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Permiso actualizado correctamente',
      permiso
    })

  }

}

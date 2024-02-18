import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('productos')
export class ProductosController {

  constructor(private readonly productosService: ProductosService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getId(@Res() res, @Param('id') id: number): Promise<any> {

    const producto = await this.productosService.getId(id);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Producto obtenido correctamente',
      producto
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get('buscar/codigo/:codigo')
  async getPorCodigo(@Res() res, @Param('codigo') codigo: string): Promise<any> {

    const {
      producto,
      cantidad,
      precio
    } = await this.productosService.getPorCodigo(codigo);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Producto obtenido correctamente',
      producto,
      cantidad,
      precio
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() res, @Query() query): Promise<any> {

    const { productos, totalItems } = await this.productosService.getAll(query);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Productos obtenidos correctamente',
      productos,
      totalItems
    })

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async insert(@Res() res, @Body() createData: Prisma.ProductosCreateInput): Promise<any> {

    const producto = await this.productosService.insert(createData);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Producto creado correctamente',
      producto
    })

  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Res() res, @Param('id') id: number, @Body() dataUpdate: Prisma.ProductosUpdateInput) {

    const producto = await this.productosService.update(id, dataUpdate);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Producto actualizado correctamente',
      producto
    })

  }

  @UseGuards(JwtAuthGuard)
  @Get('/generar/codigo')
  async generarCodigo(@Res() res): Promise<any> {

    const codigo = await this.productosService.generarCodigo();

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Codigo obtenido correctamente',
      codigo
    })

  }

}

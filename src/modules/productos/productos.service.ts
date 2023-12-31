import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Productos } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductosService {

  constructor(private prisma: PrismaService) { }

  // Producto por ID
  async getId(id: number): Promise<Productos> {

    const producto = await this.prisma.productos.findFirst({
      where: { id },
      include: {
        marca: true,
        unidadMedida: true,
        creatorUser: true,
      }
    })

    if (!producto) throw new NotFoundException('El producto no existe');
    return producto;

  }

  // Listar productos
  async getAll({
    columna = 'descripcion',
    direccion = 'desc',
    activo = '',
    parametro = '',
    pagina = 1,
    itemsPorPagina = 10000
  }: any): Promise<any> {

    // Ordenando datos
    let orderBy = {};
    orderBy[columna] = direccion;

    let where: any = {
      activo: activo === 'true' ? true : false
    };

    // where.OR.push({
    //   descripcion: {
    //     contains: parametro.toUpperCase()
    //   }
    // })

    // Total de productos
    const totalItems = await this.prisma.productos.count({ where });

    // Listado de productos
    const productos = await this.prisma.productos.findMany({
      take: Number(itemsPorPagina),
      include: {
        marca: true,
        unidadMedida: true,
        creatorUser: true,
      },
      // skip: (pagina - 1) * itemsPorPagina,
      orderBy,
      // where: {
      //   activo: false
      // }
    })

    return {
      productos,
      totalItems,
    };

  }

  // Crear producto
  async insert(createData: Prisma.ProductosCreateInput): Promise<Productos> {

    // Uppercase
    createData.descripcion = createData.descripcion?.toLocaleUpperCase().trim();

    // Verificacion: Descripcion repetida
    let productoDB = await this.prisma.productos.findFirst({ where: { descripcion: createData.descripcion } });
    if (productoDB) throw new NotFoundException('El producto ya se encuentra cargada');

    return await this.prisma.productos.create({ data: createData, include: { creatorUser: true } });

  }

  // Actualizar producto
  async update(id: number, updateData: Prisma.ProductosUpdateInput): Promise<Productos> {

    const { descripcion } = updateData;

    // Uppercase
    updateData.descripcion = updateData.descripcion?.toString().toLocaleUpperCase().trim();

    const productoDB = await this.prisma.productos.findFirst({ where: { id } });

    // Verificacion: El producto no existe
    if (!productoDB) throw new NotFoundException('El producto no existe');

    // Verificacion: Producto repetido
    if (descripcion) {
      const productoRepetido = await this.prisma.productos.findFirst({ where: { descripcion: descripcion.toString() } })
      if (productoRepetido && productoRepetido.id !== id) throw new NotFoundException('El producto ya se encuentra cargado');
    }

    return await this.prisma.productos.update({
      where: { id },
      data: updateData,
      include: {
        marca: true,
        unidadMedida: true,
        creatorUser: true,
      }
    })

  }

}

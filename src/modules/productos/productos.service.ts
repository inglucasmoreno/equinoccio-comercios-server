import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Productos } from '@prisma/client';
import { create } from 'domain';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductosService {

  constructor(private prisma: PrismaService) { }

  // Producto por ID
  async getId(id: number): Promise<Productos> {

    const producto = await this.prisma.productos.findFirst({
      where: { id },
      include: {
        // marca: true,
        unidadMedida: true,
        creatorUser: true,
      }
    })

    if (!producto) throw new NotFoundException('El producto no existe');
    return producto;

  }

  // Codigo por ID
  async getPorCodigo(codigo: string): Promise<Productos> {

    const producto = await this.prisma.productos.findFirst({
      where: { codigo },
      include: {
        // marca: true,
        unidadMedida: true,
        creatorUser: true,
      }
    })

    if (!producto) throw new NotFoundException('El producto no esta cargado');
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

    // OrderBy -> Con unidad de medida
    if (columna === 'unidadMedida') {
      orderBy = {
        unidadMedida: {
          descripcion: direccion
        }
      }
    } else {
      orderBy[columna] = direccion;
    }

    // Total de productos
    const totalItems = await this.prisma.productos.count({ where });

    // Listado de productos
    const productos = await this.prisma.productos.findMany({
      take: Number(itemsPorPagina),
      include: {
        // marca: true,
        unidadMedida: true,
        creatorUser: true,
      },
      // skip: (pagina - 1) * itemsPorPagina,
      orderBy
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
    createData.codigo = createData.codigo?.toLocaleUpperCase().trim();

    let productoDB: any = {};

    // Verificacion: Codigo repetido
    if (createData.codigo.trim() !== '') {
      productoDB = await this.prisma.productos.findFirst({ where: { codigo: createData.codigo } });
      if (productoDB) throw new NotFoundException('El código ya se encuentra cargado');
    }

    // Verificacion: Descripcion repetida
    productoDB = await this.prisma.productos.findFirst({ where: { descripcion: createData.descripcion } });
    if (productoDB) throw new NotFoundException('La descripción ya se encuentra cargada');

    const nuevoProducto = await this.prisma.productos.create({ data: createData, include: { creatorUser: true } });

    return this.getId(nuevoProducto.id);

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
        // marca: true,
        unidadMedida: true,
        creatorUser: true,
      }
    })

  }

  // Generar codigo
  async generarCodigo(): Promise<string> {

    const ultimoProducto = await this.prisma.productos.findFirst({
      orderBy: {
        id: 'desc'
      }
    });

    if (!ultimoProducto) return '0000000000001';

    const codigo = Number(ultimoProducto.id) + 1;

    return codigo.toString().padStart(13, '0');

  }

}

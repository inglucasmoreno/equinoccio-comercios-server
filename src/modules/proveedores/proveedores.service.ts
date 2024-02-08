import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Proveedores } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProveedoresService {

  constructor(private prisma: PrismaService) { }

  // Proveedor por ID
  async getId(id: number): Promise<Proveedores> {

    const proveedor = await this.prisma.proveedores.findFirst({
      where: { id },
      include: {
        creatorUser: true,
      }
    })

    if (!proveedor) throw new NotFoundException('El proveedor no existe');
    return proveedor;

  }

  // Listar proveedores
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

    // Total de proveedores
    const totalItems = await this.prisma.proveedores.count({ where });

    // Listado de proveedores
    const proveedores = await this.prisma.proveedores.findMany({
      take: Number(itemsPorPagina),
      include: {
        creatorUser: true,
      },
      // skip: (pagina - 1) * itemsPorPagina,
      orderBy,
      // where: {
      //   activo: false
      // }
    })

    return {
      proveedores,
      totalItems,
    };

  }

  // Crear proveedor
  async insert(createData: Prisma.ProveedoresCreateInput): Promise<Proveedores> {

    // Uppercase
    createData.descripcion = createData.descripcion?.toLocaleUpperCase().trim();

    // Verificar si la descripcion o la identificacion ya existen
    const proveedorDB = await this.prisma.proveedores.findFirst({
      where: {
        OR: [
          { descripcion: createData.descripcion },
          { identificacion: createData.identificacion }
        ]
      }
    });

    if (proveedorDB) throw new NotFoundException('El proveedor ya se encuentra cargado');

    return await this.prisma.proveedores.create({ data: createData, include: { creatorUser: true } });

  }

  // Actualizar proveedor
  async update(id: number, updateData: Prisma.ProveedoresUpdateInput): Promise<Proveedores> {

    const { descripcion, identificacion } = updateData;

    // Uppercase
    updateData.descripcion = updateData.descripcion?.toString().toLocaleUpperCase().trim();

    const proveedorDB = await this.prisma.proveedores.findFirst({ where: { id } });

    // Verificacion: El proveedor no existe
    if (!proveedorDB) throw new NotFoundException('El proveedor no existe');

    // Verificacion: Proveedor repetido
    if (descripcion) {
      const proveedorRepetido = await this.prisma.proveedores.findFirst({ where: { descripcion: descripcion.toString() } })
      if (proveedorRepetido && proveedorRepetido.id !== id) throw new NotFoundException('El proveedor ya se encuentra cargado');
    }

    // Verificacion: identificacion repetida
    if (identificacion) {
      const proveedorRepetido = await this.prisma.proveedores.findFirst({ where: { identificacion: identificacion.toString() } })
      if (proveedorRepetido && proveedorRepetido.id !== id) throw new NotFoundException('La identificación ya se encuentra cargada');
    }

    return await this.prisma.proveedores.update({
      where: { id },
      data: updateData,
      include: {
        creatorUser: true
      }
    })

  }

}

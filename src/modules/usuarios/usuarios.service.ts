import { Injectable, NotFoundException } from '@nestjs/common';
import { CambioPasswordDTO } from './dto';
import * as bcryptjs from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Usuarios } from '@prisma/client';

@Injectable()
export class UsuariosService {

  constructor(private prisma: PrismaService) { }

  // Usuario por ID
  async getUsuario(id: number): Promise<Usuarios> {
    const usuarioDB = await this.prisma.usuarios.findFirst({ 
      where: { id },
      include: {
        usuariosPermisos: true
      }
    });
    if (!usuarioDB) throw new NotFoundException('El usuario no existe');
    return usuarioDB;
  }

  // Usuario por nombre de usuario
  async getUsuarioPorNombre(nombreUsuario: string): Promise<Usuarios | null> {
    return await this.prisma.usuarios.findFirst({
      where: { usuario: nombreUsuario, activo: true },
      include: {
        usuariosPermisos: true
      }
    });
  }

  // Usuario por DNI
  async getUsuarioPorDNI(dni: string): Promise<Usuarios | null> {
    return await this.prisma.usuarios.findFirst({
      where: { dni, activo: true },
      include: {
        usuariosPermisos: true
      }
    });
  }

  // Usuario por email
  async getUsuarioPorEmail(email: string): Promise<Usuarios | null> {
    email = email.toLocaleLowerCase();
    return await this.prisma.usuarios.findFirst({
      where: { email, activo: true },
      include: {
        usuariosPermisos: true
      }
    });
  }

  // Listar usuario
  async listarUsuarios({ columna, direccion }: any): Promise<Usuarios[]> {

    let orderBy = {};
    orderBy[columna] = direccion == 1 ? 'asc' : 'desc';

    return await this.prisma.usuarios.findMany({
      orderBy
    });

  }

  // Crear usuario
  async crearUsuario(usuariosDTO: Prisma.UsuariosCreateInput): Promise<Usuarios> {

    // Uppercase y Lowercase
    usuariosDTO.apellido = usuariosDTO.apellido.toLocaleUpperCase();
    usuariosDTO.nombre = usuariosDTO.nombre.toLocaleUpperCase();
    usuariosDTO.email = usuariosDTO.email.toLocaleLowerCase();

    const { usuario, dni, email } = usuariosDTO;

    // Verificacion: Nombre de usuario repetido
    let usuarioDB = await this.prisma.usuarios.findFirst({ where: { usuario } })
    if (usuarioDB) throw new NotFoundException('El nombre de usuario ya se encuentra registrado');

    // Verificacion: Numero de DNI repetido
    usuarioDB = await this.getUsuarioPorDNI(dni);
    if (usuarioDB) throw new NotFoundException('El DNI ya se encuentra registrado');

    // Verificacion: Correo electronico repetido
    usuarioDB = await this.getUsuarioPorEmail(email);
    if (usuarioDB) throw new NotFoundException('El email ya se encuentra registrado');

    // Creacion de usuario
    const nuevoUsuarioDB = await this.prisma.usuarios.create({
      data: usuariosDTO
    });

    // Permisos iniciales
    if(usuariosDTO.role !== 'ADMIN_ROLE'){

      const permisos = [
        
        // Ventas
        
        { 
          seccion: 'GENERAR_VENTA',
          permiso: 'GENERAR_VENTA_ALL',
          usuarioId: nuevoUsuarioDB.id
        },
        { 
          seccion: 'VENTAS_ACTIVAS',
          permiso: 'VENTAS_ACTIVAS_ALL',
          usuarioId: nuevoUsuarioDB.id
        },
        { 
          seccion: 'BUSQUEDA_VENTAS',
          permiso: 'BUSQUEDA_VENTAS_ALL',
          usuarioId: nuevoUsuarioDB.id
        },
        {
          seccion: 'CLIENTES',
          permiso: 'CLIENTES_ALL',
          usuarioId: nuevoUsuarioDB.id
        },
        
        // Productos
        
        { 
          seccion: 'PRODUCTOS',
          permiso: 'PRODUCTOS_READ',
          usuarioId: nuevoUsuarioDB.id
        },
        { 
          seccion: 'INGRESOS',
          permiso: 'INGRESOS_ALL',
          usuarioId: nuevoUsuarioDB.id

        },
        { 
          seccion: 'PROVEEDORES',
          permiso: 'PROVEEDORES_ALL',
          usuarioId: nuevoUsuarioDB.id

        },
        
        // Reservas
        
        { 
          seccion: 'NUEVA_RESERVA',
          permiso: 'NUEVA_RESERVA_ALL',
          usuarioId: nuevoUsuarioDB.id

        },
        { 
          seccion: 'LISTADO_RESERVAS',
          permiso: 'LISTADO_RESERVAS_ALL',
          usuarioId: nuevoUsuarioDB.id

        },
        
        // Cajas
        
        { 
          seccion: 'CIERRE_CAJA',
          permiso: 'CIERRE_CAJA_ALL',
          usuarioId: nuevoUsuarioDB.id
        },
        
      ];

      // Creacion de permisos
      await this.prisma.usuariosPermisos.createMany({ data: permisos });

    }

    return nuevoUsuarioDB;

  }

  // Actualizar usuario
  async actualizarUsuario(id: any, usuariosUpdateDTO: any): Promise<Usuarios> {

    // Uppercase y Lowercase
    usuariosUpdateDTO.apellido = usuariosUpdateDTO.apellido?.toLocaleUpperCase();
    usuariosUpdateDTO.nombre = usuariosUpdateDTO.nombre?.toLocaleUpperCase();
    usuariosUpdateDTO.email = usuariosUpdateDTO.email?.toLocaleLowerCase();

    const {
      usuario,
      apellido,
      nombre,
      dni,
      email,
      role,
      password,
      activo,
    } = usuariosUpdateDTO;

    const data = {
      usuario,
      apellido,
      nombre,
      dni,
      email,
      role,
      password,
      activo
    }

    // Actualizacion de datos de usuario

    return await this.prisma.usuarios.update({ 
      where: { id }, 
      data,
    });
    

    // Actualizacion de permisos
    // await Promise.all(
    //   permisos.map(async ({ alcance, permiso, creatorUser, updatorUser }) => {

    //     const permisoDB = await this.permisosRepository.findOne({ where: [{ usuario: { id }, alcance }] });

    //     if (permisoDB) {  // Si existe y es distinto se actualiza

    //       if(permisoDB.permiso !== permiso){

    //         const dataPermiso = {
    //           permiso,
    //           updatorUser
    //         }

    //         await this.permisosRepository.update({ id: permisoDB.id }, dataPermiso);

    //       }

    //     } else { // Si no existe se crea

    //       const dataPermiso = {
    //         usuario: id,
    //         alcance,
    //         permiso,
    //         creatorUser,
    //         updatorUser
    //       };

    //       await this.permisosRepository.save(dataPermiso);

    //     }

    //   })
    // );

  }

  // Actualizar password perfil
  async actualizarPasswordPerfil(id: number, { password_actual, password_nuevo, password_nuevo_repetir }: CambioPasswordDTO): Promise<string> {

    // Datos de usuario
    const usuarioDB = await this.prisma.usuarios.findFirst({ where: { id } });

    // Verificacion - Password actual correcto
    const passwordValido = bcryptjs.compareSync(password_actual, usuarioDB.password);

    if (!usuarioDB || !passwordValido) throw new NotFoundException('La contraseña actual no coincide');

    // Verificacion - Nuevo password
    if (password_nuevo !== password_nuevo_repetir) throw new NotFoundException('Debe repetir correctamente la contraseña');

    // Actualizando contraseña
    const salt = bcryptjs.genSaltSync();
    const password = bcryptjs.hashSync(password_nuevo, salt);

    await this.prisma.usuarios.update({ where: { id }, data: { password } });
    return 'Actualizacion correcta';

  }


}

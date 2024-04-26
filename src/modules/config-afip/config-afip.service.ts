import { Injectable, NotFoundException } from '@nestjs/common';
import { Afip } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ConfigAfipService {

  constructor(private prisma: PrismaService) { }

  async getConfiguraciones(): Promise<Afip> {

    const certificado = await this.prisma.afip.findFirst({
      include: {
        creatorUser: true,
      }
    });

    return certificado;

  }

  async crearConfiguraciones(createData: any): Promise<Afip> {

    // Uppercase
    createData.razonSocial = createData.razonSocial?.toLocaleUpperCase().trim();
    createData.domicilio = createData.domicilio?.toLocaleUpperCase().trim();

    return await this.prisma.afip.create({ data: createData, include: { creatorUser: true } });
  }

  async actualizarConfiguraciones(id: number, updateData: any): Promise<Afip> {

    // Uppercase
    updateData.razonSocial = updateData.razonSocial?.toString().toLocaleUpperCase().trim();
    updateData.domicilio = updateData.domicilio?.toString().toLocaleUpperCase().trim();

    // Adaptando fechas
    if (updateData.inicioActividad) {
      updateData.inicioActividad = new Date(updateData.inicioActividad);
      updateData.inicioActividad.setHours(updateData.inicioActividad.getHours() + 3);
    }

    return await this.prisma.afip.update({
      where: { id },
      data: updateData,
      include: {
        creatorUser: true
      }
    })
  }

}

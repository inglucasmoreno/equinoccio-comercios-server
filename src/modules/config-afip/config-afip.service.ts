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
    return await this.prisma.afip.create({ data: createData, include: { creatorUser: true } });
  }

  async actualizarConfiguraciones(id: number, updateData: any): Promise<Afip> {
    return await this.prisma.afip.update({
      where: { id },
      data: updateData,
      include: {
        creatorUser: true
      }
    })
  }

}

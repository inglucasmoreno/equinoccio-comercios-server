import { Module } from '@nestjs/common';
import { ConfigBalanzaController } from './config-balanza.controller';
import { ConfigBalanzaService } from './config-balanza.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ConfigBalanzaController],
  providers: [ConfigBalanzaService, PrismaService]
})
export class ConfigBalanzaModule {}

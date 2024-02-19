import { Module } from '@nestjs/common';
import { ConfigGeneralesService } from './config-generales.service';
import { ConfigGeneralesController } from './config-generales.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [ConfigGeneralesService, PrismaService],
  controllers: [ConfigGeneralesController]
})
export class ConfigGeneralesModule {}

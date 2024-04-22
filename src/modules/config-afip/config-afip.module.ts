import { Module } from '@nestjs/common';
import { ConfigAfipService } from './config-afip.service';
import { ConfigAfipController } from './config-afip.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ConfigAfipService, PrismaService],
  controllers: [ConfigAfipController]
})
export class ConfigAfipModule {}

import { Module } from '@nestjs/common';
import { AfipService } from './afip.service';
import { AfipController } from './afip.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AfipService, PrismaService],
  controllers: [AfipController]
})
export class AfipModule {}

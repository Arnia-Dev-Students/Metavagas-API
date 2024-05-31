import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';
import { Technology } from '../database/entities/technology.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Technology])],
  controllers: [TechnologiesController],
  providers: [TechnologiesService],
  exports: [TechnologiesService]
})
export class TechnologiesModule {}

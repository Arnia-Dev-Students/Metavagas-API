import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TechnologiesService } from './technologies.service';
import { TechnologiesController } from './technologies.controller';
import { Tecnology } from '../database/entities/tecnology.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Tecnology])],
  controllers: [TechnologiesController],
  providers: [TechnologiesService],
})
export class TechnologiesModule {}

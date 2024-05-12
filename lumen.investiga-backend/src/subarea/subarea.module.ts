import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subarea } from './subarea.model';

@Module({
  imports: [SequelizeModule.forFeature([Subarea])]
})
export class SubareaModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Area } from './area.model';

@Module({
  imports: [SequelizeModule.forFeature([Area])]
})
export class AreaModule {}

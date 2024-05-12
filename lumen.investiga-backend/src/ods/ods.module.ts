import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ODS } from './ods.model';

@Module({
  imports: [SequelizeModule.forFeature([ODS])]
})
export class OdsModule {}

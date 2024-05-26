import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ODS } from './ods.model';
import { ODScontroller } from './ods.controller';
import { ODSservice } from './ods.service';

@Module({
  imports: [SequelizeModule.forFeature([ODS])],
  controllers: [ODScontroller],
  providers: [ODSservice]
})
export class OdsModule {}

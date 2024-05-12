import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Periodo } from './periodos.model';

@Module({
  imports: [SequelizeModule.forFeature([Periodo])]
})
export class PeriodosModule {}

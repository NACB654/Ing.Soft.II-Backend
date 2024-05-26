import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Periodo } from './periodos.model';
import { PeriodoController } from './periodos.controller';
import { PeeriodosService } from './periodos.service';

@Module({
  imports: [SequelizeModule.forFeature([Periodo])],
  controllers: [PeriodoController],
  providers: [PeeriodosService]
})
export class PeriodosModule {}

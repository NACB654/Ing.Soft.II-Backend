import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Asesor } from './asesores.model';

@Module({
  imports: [SequelizeModule.forFeature([Asesor])]
})
export class AsesoresModule {}

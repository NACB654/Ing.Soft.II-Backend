import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Alumno } from './alumnos.model';

@Module({
  imports: [SequelizeModule.forFeature([Alumno])]
})
export class AlumnosModule {}

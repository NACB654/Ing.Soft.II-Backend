import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Curso } from './cursos.model';

@Module({
  imports: [SequelizeModule.forFeature([Curso])]
})
export class CursosModule {}

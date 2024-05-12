import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CursoProfesor } from './cursos-profesores.model';

@Module({
  imports: [SequelizeModule.forFeature([CursoProfesor])]
})
export class CursosProfesoresModule {}

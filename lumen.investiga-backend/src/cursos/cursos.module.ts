import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Curso } from './cursos.model';
import { CursosController } from './cursos.controller';
import { CursosService } from './cursos.services';

@Module({
  imports: [SequelizeModule.forFeature([Curso])],
  controllers: [CursosController],
  providers: [CursosService]
})
export class CursosModule {}

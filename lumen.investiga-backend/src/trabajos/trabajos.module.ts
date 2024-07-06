import { Module } from '@nestjs/common';
import { TrabajosInvestigacionController } from './trabajos.controller';
import { TrabajosInvestigacionService } from './trabajos.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrabajosInvestigacion } from './trabajos.model';
import { ProfesoresService } from 'src/profesores/profesores.service';
import { Profesor } from 'src/profesores/profesores.model';
import { KeywordsService } from 'src/keywords/keywords.service';
import { ODSservice } from 'src/ods/ods.service';
import { AlumnosService } from 'src/alumnos/alumnos.service';
import { AsesoresService } from 'src/asesores/asesores.service';
import { Keyword } from 'src/keywords/keywords.model';
import { ODS } from 'src/ods/ods.model';
import { Alumno } from 'src/alumnos/alumnos.model';
import { Asesor } from 'src/asesores/asesores.model';
import { PeeriodosService } from 'src/periodos/periodos.service';
import { Periodo } from 'src/periodos/periodos.model';
import { Area } from 'src/area/area.model';
import { Subarea } from 'src/subarea/subarea.model';
import { SubareaService } from 'src/subarea/subarea.service';
import { Curso } from 'src/cursos/cursos.model';
import { CursosService } from 'src/cursos/cursos.services';

@Module({
  imports: [SequelizeModule.forFeature([TrabajosInvestigacion, Profesor, Keyword, ODS, Alumno, Asesor, Periodo, Area, Subarea, Curso])],
  controllers: [TrabajosInvestigacionController],
  providers: [TrabajosInvestigacionService, ProfesoresService, KeywordsService, ODSservice, AlumnosService, AsesoresService, PeeriodosService, SubareaService, CursosService],
})
export class TrabajosInvestigacionModule {}
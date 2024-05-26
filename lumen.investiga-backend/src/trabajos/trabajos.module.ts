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

@Module({
  imports: [SequelizeModule.forFeature([TrabajosInvestigacion, Profesor, Keyword, ODS, Alumno, Asesor])],
  controllers: [TrabajosInvestigacionController],
  providers: [TrabajosInvestigacionService, ProfesoresService, KeywordsService, ODSservice, AlumnosService, AsesoresService],
})
export class TrabajosInvestigacionModule {}
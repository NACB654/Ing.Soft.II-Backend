import { Module } from '@nestjs/common';
import { ProfesoresController } from './profesores.controller';
import { ProfesoresService } from './profesores.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profesor } from './profesores.model';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';
import { ODS } from 'src/ods/ods.model';
import { Keyword } from 'src/keywords/keywords.model';
import { AlumnosService } from 'src/alumnos/alumnos.service';
import { AsesoresService } from 'src/asesores/asesores.service';
import { Alumno } from 'src/alumnos/alumnos.model';
import { Asesor } from 'src/asesores/asesores.model';
import { ODSservice } from 'src/ods/ods.service';
import { KeywordsService } from 'src/keywords/keywords.service';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [SequelizeModule.forFeature([Profesor, TrabajosInvestigacion, Alumno, Asesor, ODS, Keyword])],
    controllers: [ProfesoresController],
    providers: [ProfesoresService, AlumnosService, AsesoresService, ODSservice, KeywordsService, GoogleDriveService, ConfigService],
})
export class ProfesoresModule {}

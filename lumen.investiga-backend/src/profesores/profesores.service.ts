import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Alumno } from 'src/alumnos/alumnos.model';
import { CreateAlumno } from 'src/alumnos/dto/create-alumno.dto';
import { Asesor } from 'src/asesores/asesores.model';
import { CreateAsesorDto } from 'src/asesores/dto/create-asesor.dto';
import { Keyword } from 'src/keywords/keywords.model';
import { ODS } from 'src/ods/ods.model';
import { CreateTrabajo } from 'src/trabajos/dto/create-trabajo.dto';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';
import { Profesor } from './profesores.model';
import { AlumnosService } from 'src/alumnos/alumnos.service';
import { AsesoresService } from 'src/asesores/asesores.service';
import { KeywordsService } from 'src/keywords/keywords.service';
import { ODSservice } from 'src/ods/ods.service';

@Injectable({})
export class ProfesoresService {
  constructor(
    @InjectModel(TrabajosInvestigacion)
    private trabajoModel: typeof TrabajosInvestigacion,
    @InjectModel(Profesor)
    private profesorModel: typeof Profesor,
    private keywordService: KeywordsService,
    private odsService: ODSservice,
    private alumnoService: AlumnosService,
    private asesorService: AsesoresService
  ) {}

  async subirTrabajo(trabajo: CreateTrabajo) {
    console.log(trabajo)
    try {
      const keywords = await this.keywordService.findOrCreateKewords(trabajo.keywords);
      const ods = await this.odsService.findODSbyId(trabajo.ods);
      const alumno = await this.alumnoService.findOrCreateAlumno(trabajo.alumno)
      const asesor = await this.asesorService.findOrCreateAsesor(trabajo.asesor)
      const profesor = await this.findProfesor(trabajo.profesor)

      const result = await this.trabajoModel.create({
        titulo: trabajo.titulo,
        abstract: trabajo.abstract,
        archivo_url: trabajo.archivo_url,
        alumnoId: alumno.id,
        asesorId: asesor.id,
        subareaId: trabajo.subareaId,
        cursoId: trabajo.cursoId,
        periodoId: trabajo.periodoId,
        profesorId: profesor.id
      });

      await result.$set('keywords', keywords)
      await result.$set('ods', ods)

      return result;

    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async findProfesor(profe: string): Promise<Profesor> {
    let profesor = await this.profesorModel.findOne({
      where: { name: profe },
    });

    return profesor;
  }
}
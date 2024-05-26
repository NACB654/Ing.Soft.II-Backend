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

@Injectable({})
export class ProfesoresService {
  constructor(
    @InjectModel(TrabajosInvestigacion)
    private trabajoModel: typeof TrabajosInvestigacion,
    @InjectModel(Keyword)
    private keywordModel: typeof Keyword,
    @InjectModel(ODS)
    private odsModel: typeof ODS,
    @InjectModel(Profesor)
    private profesorModel: typeof Profesor,
    private alumnoService: AlumnosService,
    private asesorService: AsesoresService
  ) {}

  async subirTrabajo(trabajo: CreateTrabajo) {
    try {
      const keywords = await Promise.all(
        trabajo.keywords.map(async (keywordName: string) => {
          let keyword = await this.keywordModel.findOne({
            where: { descripcion: keywordName },
          });
          if (!keyword) {
            keyword = await this.keywordModel.create({ descripcion: keywordName });
          }
          return keyword;
        }),
      );

      const ods = await this.odsModel.findAll({
        where: {
          id: trabajo.ods,
        },
      });

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

  private async findProfesor(profe: string): Promise<Profesor> {
    let profesor = await this.profesorModel.findOne({
      where: { name: profe },
    });

    return profesor;
  }
}
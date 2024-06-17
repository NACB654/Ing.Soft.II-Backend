import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TrabajosInvestigacion } from './trabajos.model';
import { ProfesoresService } from 'src/profesores/profesores.service';
import { Alumno } from 'src/alumnos/alumnos.model';
import { Keyword } from 'src/keywords/keywords.model';
import { Model, Op } from 'sequelize';
import { Profesor } from 'src/profesores/profesores.model';
import { ODS } from 'src/ods/ods.model';
import { Asesor } from 'src/asesores/asesores.model';
import { Curso } from 'src/cursos/cursos.model';
import { Periodo } from 'src/periodos/periodos.model';
import { Subarea } from 'src/subarea/subarea.model';
import { Area } from 'src/area/area.model';

@Injectable({})
export class TrabajosInvestigacionService {
  constructor(
    @InjectModel(TrabajosInvestigacion)
    private trabajoModel: typeof TrabajosInvestigacion,
    private profesorSevice: ProfesoresService,
  ) {}

  async getTrabajos(profe: string) {
    try {
      const profesor = await this.profesorSevice.findProfesor(profe);

      return await this.trabajoModel.findAll({
        where: {
          profesorId: profesor.id,
        },
        include: Alumno,
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async mostrarResultados(keyword: string) {
    try {
      return await this.trabajoModel.findAll({
        include: [
          {
            model: Keyword,
            where: {
              descripcion: {
                [Op.iLike]: `%${keyword}`,
              },
            },
            through: { attributes: [] },
          },
          Alumno,
        ],
        order: [
          ['titulo', 'ASC']
        ]
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async mostrarDetalle(id: number) {
    try {
      return await this.trabajoModel.findOne({
        where: { id },
        include: [
          {
            model: Alumno,
          },
          { model: Profesor },
          { model: ODS },
          { model: Asesor },
          { model: Curso },
          { model: Periodo },
          { model: Subarea, include: [{ model: Area }] },
          { model: Keyword },
        ],
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  abrirTrabajo() {
    return { msg: 'Abriendo trabajo' };
  }
}

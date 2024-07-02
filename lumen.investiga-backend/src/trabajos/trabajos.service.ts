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
import { filtrosDto } from './dto/filtros.dto';
import { Usuario } from 'src/usuarios/usuarios.model';

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

  async getTrabajosGuardados(id: number) {
    try {
      return await this.trabajoModel.findAll({
        include: [
          {
            model: Usuario,
            where: {
              id
            },
            through: { attributes: [] },
          },
          Alumno,
        ]
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
          ODS,
          Curso,
          Periodo,
          { model: Subarea, include: [{ model: Area }] },
        ],
        order: [['titulo', 'ASC']],
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
          { model: Usuario, through: {attributes: []} }
        ],
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async filtrarResultados(filtros: filtrosDto) {
    try {
      return await this.trabajoModel.findAll({
        include: [
          {
            model: Keyword,
            where: {
              descripcion: {
                [Op.iLike]: `%${filtros.keyword}%`,
              },
            },
            through: { attributes: [] },
          },
          Alumno,
          {
            model: ODS,
            where: filtros.ods ? { id: filtros.ods } : undefined,
          },
          {
            model: Curso,
            where: filtros.cursoId ? { id: filtros.cursoId } : undefined,
          },
          {
            model: Periodo,
            where: filtros.periodoId ? { id: filtros.periodoId } : undefined,
          },
          {
            model: Subarea,
            where: filtros.subareaId ? { id: filtros.subareaId } : undefined,
            include: [
              {
                model: Area,
                where: filtros.areaId ? { id: filtros.areaId } : undefined,
              },
            ],
          },
        ],
        order: [['titulo', 'ASC']],
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

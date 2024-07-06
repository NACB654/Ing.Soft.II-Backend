import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Curso } from "./cursos.model";
import { Sequelize } from "sequelize-typescript";
import { TrabajosInvestigacion } from "src/trabajos/trabajos.model";

@Injectable({})
export class CursosService {
  constructor(@InjectModel(Curso) private cursoModel: typeof Curso) { }
  
  async getCursos() {
    try {
      return await this.cursoModel.findAll();
    } catch (err) {
      console.error(err)
      return null;
    }
  }

  async totalTrabajosCurso() {
    return await this.cursoModel.findAll({
      attributes: [
        'id',
        "descripcion",
        [Sequelize.fn("COUNT", Sequelize.col("Curso.id")), "totalTrabajos"]
      ],
      include: [{
        model: TrabajosInvestigacion,
        attributes: [],
        required: true,
        duplicating: false
      }],
      group: ["Curso.id", "Curso.descripcion"],
      order: [['totalTrabajos', 'DESC']],
      limit: 3
    })
  }
}
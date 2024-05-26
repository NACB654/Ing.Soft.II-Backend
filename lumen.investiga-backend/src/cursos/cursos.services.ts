import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Curso } from "./cursos.model";

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
}
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Periodo } from "./periodos.model";

@Injectable({})
export class PeeriodosService {
  constructor(@InjectModel(Periodo) private periodoModel: typeof Periodo) { }
  
  async getPeriodos() {
    try {
      return await this.periodoModel.findAll();
    }
    catch (err) {
      console.error(err)
      return null
    }
  }
}
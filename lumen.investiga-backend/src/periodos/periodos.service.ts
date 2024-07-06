import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Periodo } from "./periodos.model";
import { Sequelize } from "sequelize-typescript";
import { TrabajosInvestigacion } from "src/trabajos/trabajos.model";

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

  async totalTrabajosPeriodos() {
    return await this.periodoModel.findAll({
      attributes: [
        'id',
        'descripcion',
        [Sequelize.fn('COUNT', Sequelize.col('Periodo.id')), 'totalTrabajos']
      ],
      include: [{
        model: TrabajosInvestigacion,
        attributes: [],
        required: true,
        duplicating: false
      }],
      group: ['Periodo.id', 'Periodo.descripcion'],
      order: [["totalTrabajos", "DESC"]],
      limit: 3
    })
  }
}
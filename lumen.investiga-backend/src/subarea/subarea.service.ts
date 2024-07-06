import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Subarea } from "./subarea.model";
import { Area } from "src/area/area.model";
import { Sequelize } from "sequelize-typescript";
import { TrabajosInvestigacion } from "src/trabajos/trabajos.model";

@Injectable({})
export class SubareaService {
  constructor(@InjectModel(Subarea) private subareaModel: typeof Subarea) { }
  
  async getSubareas() {
    try {
      return await this.subareaModel.findAll({ include: Area });
    } catch (err) {
      console.error(err)
      return null;
    }
  }

  async totalTrabajosAreasSubareas() {
    return await this.subareaModel.findAll({
      attributes: [
        'id',
        'descripcion',
        [Sequelize.fn('COUNT', Sequelize.col('Subarea.id')), 'totalTrabajos']
      ],
      include: [{
        model: TrabajosInvestigacion,
        attributes: [],
        required: true,
        duplicating: false
      }, {
        model: Area,
        attributes: ['id', 'descripcion'],
      }],
      group: ['Subarea.id', 'Subarea.descripcion', 'area.id', 'area.descripcion'],
      order: [["totalTrabajos", "DESC"]],
      limit: 3
    })
  }
}
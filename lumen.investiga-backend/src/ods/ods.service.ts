import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ODS } from "./ods.model";
import { Sequelize } from "sequelize";
import { TrabajosInvestigacion } from "src/trabajos/trabajos.model";

@Injectable({})
export class ODSservice {
  constructor(@InjectModel(ODS) private odsModel: typeof ODS) { }
  
  async getODS() {
    try {
      return await this.odsModel.findAll();
    } catch (err) {
      console.error(err)
      return null;
    }
  }

  async findODSbyId(odsDto: number[]) {
    return await this.odsModel.findAll({
      where: {
        id: odsDto,
      },
    });
  }

  async totalTrabajosODS() {
    return await this.odsModel.findAll({
      attributes: [
        'id',
        'descripcion',
        [Sequelize.fn('COUNT', Sequelize.col('ODS.id')), 'totalTrabajos']
      ],
      include: [{
        model: TrabajosInvestigacion,
        attributes: [],
        through: { attributes: [] },
        required: true,
        duplicating: false
      }],
      group: ['ODS.id', 'ODS.descripcion'],
      order: [["totalTrabajos", "DESC"]],
      limit: 3
    })
  }
}
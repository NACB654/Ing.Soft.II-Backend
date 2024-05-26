import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ODS } from "./ods.model";

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
}
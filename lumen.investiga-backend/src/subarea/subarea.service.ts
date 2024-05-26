import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Subarea } from "./subarea.model";
import { Area } from "src/area/area.model";

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
}
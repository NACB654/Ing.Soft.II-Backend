import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Asesor } from "./asesores.model";
import { CreateAsesorDto } from "./dto/create-asesor.dto";

@Injectable()
export class AsesoresService {
  constructor(@InjectModel(Asesor) private asesorModel: typeof Asesor) { }
  
  async crearAsesor(asesor: CreateAsesorDto) {
    try {
      return await this.asesorModel.create(asesor as any);
    }
    catch (err) {
      console.error(err)
      return null;
    }
  }

  async getAsesores() {
    try {
      return await this.asesorModel.findAll();
    }
    catch (err) {
      console.error(err)
      return null;
    }
  }
}
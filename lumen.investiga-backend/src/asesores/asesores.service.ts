import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Asesor } from "./asesores.model";
import { CreateAsesorDto } from "./dto/create-asesor.dto";

@Injectable()
export class AsesoresService {
  constructor(@InjectModel(Asesor) private asesorModel: typeof Asesor) { }
  
  async findOrCreateAsesor(asesorDto: CreateAsesorDto): Promise<Asesor> {
    let asesor = await this.asesorModel.findOne({
      where: { name: asesorDto.name },
    });
    if (!asesor) {
      asesor = await this.asesorModel.create(asesorDto as any);
    }
    return asesor;
  }
}
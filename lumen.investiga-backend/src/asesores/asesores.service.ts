import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Asesor } from "./asesores.model";
import { CreateAsesorDto } from "./dto/create-asesor.dto";
import { TrabajosInvestigacion } from "src/trabajos/trabajos.model";
import { Sequelize } from "sequelize-typescript";

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

  async totalTrabajosAsesor() {
    return await this.asesorModel.findAll({
      attributes: [
        'id',
        'name',
        'last_name',
        [Sequelize.fn('COUNT', Sequelize.col('Asesor.id')), 'totalTrabajos']
      ],
      include: [{
        model: TrabajosInvestigacion,
        attributes: [],
        required: true,
        duplicating: false
      }],
      group: ['Asesor.id', 'Asesor.name', 'Asesor.last_name'],
      order: [["totalTrabajos", "DESC"]],
      limit: 3
    })
  }
}
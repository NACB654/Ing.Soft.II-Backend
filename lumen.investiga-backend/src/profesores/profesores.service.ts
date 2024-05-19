import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTrabajo } from 'src/trabajos/dto/create-trabajo.dto';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';

@Injectable({})
export class ProfesoresService {
  constructor(
    @InjectModel(TrabajosInvestigacion)
    private trabajoModel: typeof TrabajosInvestigacion,
  ) {}

  async subirTrabajo(trabajo: CreateTrabajo) {
    try {
      return await this.trabajoModel.create(trabajo as any);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TrabajosInvestigacion } from './trabajos.model';

@Injectable({})
export class TrabajosInvestigacionService {
  constructor(
    @InjectModel(TrabajosInvestigacion)
    private trabajoModel: typeof TrabajosInvestigacion,
  ) {}

  async mostrarResultados(keyword: string) {
    try {
      return await this.trabajoModel.findOne({ where: { keyword } });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async mostrarDetalle(id: number) {
    try {
      return await this.trabajoModel.findOne({ where: { id } });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  abrirTrabajo() {
    return { msg: 'Abriendo trabajo' };
  }
}

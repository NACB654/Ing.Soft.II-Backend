import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Valoracion } from './valoracion.model';
import { CreateRatingDto } from './dto/create-rating.dto';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';

@Injectable({})
export class ValoracionService {
  constructor(
    @InjectModel(Valoracion) private valoracionModel: typeof Valoracion,
    @InjectModel(TrabajosInvestigacion)
    private trabajoModel: typeof TrabajosInvestigacion,
  ) {}

  async calcularPromedio(trabajoId: number) {
    const result = await this.valoracionModel.findAll({
      where: {
        trabajoId: trabajoId
      }
    })
    if (result) {
      const puntajes = result.map(item => item.puntaje)
      const sum = puntajes.reduce((acum, puntaje) => acum + puntaje, 0)
      return Math.round((sum / puntajes.length) * 2) / 2
    }
  }

  async valorarTrabajo(valoracionDto: CreateRatingDto) {
    try {
      const result = await this.valoracionModel.create(valoracionDto as any);
      if (result) {
        const promedio = await this.calcularPromedio(result.trabajoId)
        return await this.trabajoModel.update({puntaje: promedio}, {where: {id: result.trabajoId}})
      }

    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

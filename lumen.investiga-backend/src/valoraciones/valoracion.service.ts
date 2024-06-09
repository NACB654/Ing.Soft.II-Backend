import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Valoracion } from "./valoracion.model";

@Injectable({})
export class ValoracionService {
  constructor(@InjectModel(Valoracion) private valoracionModel: typeof Valoracion) { }
  
  calcularPromedio() {
    // agregar logica
  }
}
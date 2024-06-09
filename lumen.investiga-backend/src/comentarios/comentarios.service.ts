import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Comentario } from "./cometarios.model";

@Injectable({})
export class ComentarioService {
  constructor(@InjectModel(Comentario) private comentarioModel: typeof Comentario) { }
  
  getComentarios() {
    // agregar logica
  }
}
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Comentario } from "./cometarios.model";
import { Usuario } from "src/usuarios/usuarios.model";
import { createComentario } from "./dto/createcomentario.dto";

@Injectable({})
export class ComentarioService {
  constructor(@InjectModel(Comentario) private comentarioModel: typeof Comentario) { }
  
  async getComentarios(trabajoId: number) {
    return await this.comentarioModel.findAll({
      where: { trabajoId },
      include: { model: Usuario, attributes: ['name', 'last_name'] }
    });
  }

  async crearComentario (comentariodto: createComentario) {
    try {
      return await this.comentarioModel.create(comentariodto as any)
    } catch (error) {
      console.error (error)
      return null
    }
  }
}



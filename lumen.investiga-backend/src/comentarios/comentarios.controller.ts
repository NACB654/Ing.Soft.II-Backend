import { Body, Controller, Get, Post } from "@nestjs/common";
import { ComentarioService } from "./comentarios.service";
import { createComentario } from "./dto/createcomentario.dto";

@Controller('comentario')
export class ComentarioController {
  constructor(private comentarioService: ComentarioService) { }
  
  @Get('info')
  getComentarios() {
    // agregar logica
  }

  @Post("crear")
  crearComentario(@Body() comentario: createComentario) {
    return this.comentarioService.crearComentario(comentario)
  }



}

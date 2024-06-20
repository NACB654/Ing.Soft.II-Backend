import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ComentarioService } from "./comentarios.service";
import { createComentario } from "./dto/createcomentario.dto";

@Controller('comentario')
export class ComentarioController {
  constructor(private comentarioService: ComentarioService) { }
  
  @Get('info/:id')
  getComentarios(@Param("id") trabajoId: number) {
    return this.comentarioService.getComentarios(trabajoId);
  }

  @Post("crear")
  crearComentario(@Body() comentario: createComentario) {
    return this.comentarioService.crearComentario(comentario)
  }



}

import { Controller, Get } from "@nestjs/common";
import { ComentarioService } from "./comentarios.service";

@Controller('comentario')
export class ComentarioController {
  constructor(private comentarioService: ComentarioService) { }
  
  @Get('info')
  getComentarios() {
    // agregar logica
  }
}

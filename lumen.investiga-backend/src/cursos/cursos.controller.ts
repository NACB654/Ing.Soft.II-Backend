import { Controller, Get } from "@nestjs/common";
import { CursosService } from "./cursos.services";

@Controller('curso')
export class CursosController {
  constructor(private cursoServise: CursosService) { }
  
  @Get('info')
  getCursos() {
    return this.cursoServise.getCursos();
  }
}
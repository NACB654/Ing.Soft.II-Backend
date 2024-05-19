import { Body, Controller, Post } from "@nestjs/common";
import { CreateAsesorDto } from "./dto/create-asesor.dto";

@Controller('asesor')
export class AsesoresController {
  constructor(private asesorService: AsesoresController) { }
  
  @Post('crear')
  crearAsesor(@Body() asesor: CreateAsesorDto) {
    return this.asesorService.crearAsesor(asesor);
  }
}
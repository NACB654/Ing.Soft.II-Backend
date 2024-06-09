import { Controller, Get } from "@nestjs/common";
import { ValoracionService } from "./valoracion.service";

@Controller('valoracion')
export class ValoracionController {
  constructor(private valoracionService: ValoracionService) { }
  
  @Get('promedio')
  calcularPromedio() {
    // agregar logica
  }
}
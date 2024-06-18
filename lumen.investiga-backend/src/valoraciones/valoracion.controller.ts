import { Body, Controller, Get, Post } from "@nestjs/common";
import { ValoracionService } from "./valoracion.service";
import { CreateRatingDto } from "./dto/create-rating.dto";

@Controller('valoracion')
export class ValoracionController {
  constructor(private valoracionService: ValoracionService) { }
  
  @Get('promedio')
  calcularPromedio() {
    // agregar logica
  }

  @Post('valorar')
  valorarTrabajo(@Body() valoracion: CreateRatingDto) {
    return this.valoracionService.valorarTrabajo(valoracion)
  }
}
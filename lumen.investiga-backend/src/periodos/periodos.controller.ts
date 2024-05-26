import { Controller, Get } from "@nestjs/common";
import { PeriodosModule } from "./periodos.module";
import { PeeriodosService } from "./periodos.service";

@Controller('periodo')
export class PeriodoController {
  constructor(private periodoService: PeeriodosService) { }
  
  @Get('info')
  getPeriodo() {
    return this.periodoService.getPeriodos();
  }
}
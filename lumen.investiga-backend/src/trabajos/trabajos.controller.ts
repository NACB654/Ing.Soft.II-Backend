import { Controller, Get, Post } from "@nestjs/common";
import { TrabajosInvestigacionService } from "./trabajos.service";

@Controller('trabajo')
export class TrabajosInvestigacionController {
    constructor(private trabajosInvestigacionService: TrabajosInvestigacionService) {}

    @Get('mostrar')
    mostrarResultados() {
        return this.trabajosInvestigacionService.mostrarResultados()
    }

    @Get('abrir')
    abrirTrabajo() {
        return this.trabajosInvestigacionService.abrirTrabajo()
    }
}
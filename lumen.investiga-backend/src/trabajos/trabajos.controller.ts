import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { TrabajosInvestigacionService } from "./trabajos.service";

@Controller('trabajo')
export class TrabajosInvestigacionController {
    constructor(private trabajosInvestigacionService: TrabajosInvestigacionService) {}

    @Get('mostrar')
    mostrarResultados(@Query("keyword") keyword) {
        return this.trabajosInvestigacionService.mostrarResultados(keyword)
    }

    @Get('detalle/:id')
    mostrarDetalle(@Param("id") id: number) {
        return this.trabajosInvestigacionService.mostrarDetalle(id)
    }

    @Get('abrir')
    abrirTrabajo() {
        return this.trabajosInvestigacionService.abrirTrabajo()
    }
}
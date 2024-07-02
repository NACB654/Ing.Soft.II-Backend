import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { TrabajosInvestigacionService } from "./trabajos.service";
import { filtrosDto } from "./dto/filtros.dto";

@Controller('trabajo')
export class TrabajosInvestigacionController {
    constructor(private trabajosInvestigacionService: TrabajosInvestigacionService) { }
    
    @Get('subidos/:profe')
    getTrabajos(@Param('profe') profe: string) {
        return this.trabajosInvestigacionService.getTrabajos(profe);
    }

    @Get('mostrar')
    mostrarResultados(@Query("keyword") keyword: string) {
        console.log(keyword)
        return this.trabajosInvestigacionService.mostrarResultados(keyword)
    }

    @Get('detalle/:id')
    mostrarDetalle(@Param("id") id: number) {
        return this.trabajosInvestigacionService.mostrarDetalle(id)
    }

    @Post("filtrar")
    filtrarResultados(@Body() filtros: filtrosDto) {
        return this.trabajosInvestigacionService.filtrarResultados(filtros)
    }

    @Get('guardados/:id')
    getTrabajosGuardados(@Param("id") id: number) {
        return this.trabajosInvestigacionService.getTrabajosGuardados(id);
    }
}
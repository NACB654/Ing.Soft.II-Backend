import { Body, Controller, Post } from "@nestjs/common";
import { ProfesoresService } from "./profesores.service";
import { CreateTrabajo } from "src/trabajos/dto/create-trabajo.dto";

@Controller('profesor')
export class ProfesoresController {
    constructor(private profesorService: ProfesoresService) {}
    
    @Post('subir')
    subirTrabajo(@Body() trabajo: CreateTrabajo) {
        this.profesorService.subirTrabajo(trabajo)
    }
}
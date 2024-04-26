import { Controller, Post } from "@nestjs/common";
import { ProfesoresService } from "./profesores.service";

@Controller('profesor')
export class ProfesoresController {
    constructor(private profesorService: ProfesoresService) {}

    @Post('subir')
    subirTrabajo() {
        this.profesorService.subirTrabajo()
    }
}
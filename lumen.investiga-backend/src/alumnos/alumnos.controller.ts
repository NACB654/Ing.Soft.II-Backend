import { Body, Controller, Post } from "@nestjs/common";
import { AlumnosService } from "./alumnos.service";
import { CreateAlumno } from "./dto/create-alumno.dto";

@Controller('alumno')
export class AlumnosController {
  constructor(private alumnoService: AlumnosService) { }
  
  @Post('crear')
  crearAlumno(@Body() alumno: CreateAlumno) {
    return this.alumnoService.crearAlumno(alumno);
  }
}
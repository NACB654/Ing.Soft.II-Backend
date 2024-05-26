import { CreateAlumno } from "src/alumnos/dto/create-alumno.dto";
import { CreateAsesorDto } from "src/asesores/dto/create-asesor.dto";

export class CreateTrabajo {
  titulo: string;
  abstract: string;
  archivo_url: string;
  subareaId: number;
  periodoId: number;
  asesor: CreateAsesorDto;
  keywords: string[];
  profesor: string;
  alumno: CreateAlumno;
  ods: number[];
  cursoId: number;
}
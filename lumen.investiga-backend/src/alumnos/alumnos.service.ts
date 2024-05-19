import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Alumno } from "./alumnos.model";
import { CreateAlumno } from "./dto/create-alumno.dto";

@Injectable()
export class AlumnosService {
  constructor(@InjectModel(Alumno) private alumnoModel: typeof Alumno) { }
  
  async crearAlumno(alumno: CreateAlumno) {
    try {
      return await this.alumnoModel.create(alumno as any)
    }
    catch(err) {
      console.error(err)
      return null;
    }
  }
}
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Alumno } from "./alumnos.model";
import { CreateAlumno } from "./dto/create-alumno.dto";

@Injectable()
export class AlumnosService {
  constructor(@InjectModel(Alumno) private alumnoModel: typeof Alumno) { }
  
  async findOrCreateAlumno(alumnoDto: CreateAlumno): Promise<Alumno> {
    let alumno = await this.alumnoModel.findOne({
      where: { name: alumnoDto.name },
    });
    if (!alumno) {
      alumno = await this.alumnoModel.create(alumnoDto as any);
    }
    return alumno;
  }
}
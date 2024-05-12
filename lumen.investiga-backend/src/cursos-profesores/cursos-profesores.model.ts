import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Curso } from "src/cursos/cursos.model";
import { Profesor } from "src/profesores/profesores.model";

@Table
export class CursoProfesor extends Model {
  @ForeignKey(() => Curso)
  @Column
  cursoId: number;

  @ForeignKey(() => Profesor)
  @Column
  profesorId: number;
}
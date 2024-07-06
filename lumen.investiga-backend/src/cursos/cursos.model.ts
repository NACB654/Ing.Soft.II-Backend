import { AllowNull, AutoIncrement, BelongsToMany, Column, CreatedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { CursoProfesor } from 'src/cursos-profesores/cursos-profesores.model';
import { Profesor } from 'src/profesores/profesores.model';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';

@Table
export class Curso extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  descripcion: string;

  @BelongsToMany(() => Profesor, () => CursoProfesor)
  profesor: Profesor[]

  @HasMany(() => TrabajosInvestigacion)
  trabajos: TrabajosInvestigacion[]

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
import { AllowNull, AutoIncrement, BelongsToMany, Column, CreatedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { CursoProfesor } from 'src/cursos-profesores/cursos-profesores.model';
import { Curso } from 'src/cursos/cursos.model';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';

@Table
export class Profesor extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  name: string;

  @Column
  last_name: string;

  @BelongsToMany(() => Curso, () => CursoProfesor)
  curso: Curso[];

  @HasMany(() => TrabajosInvestigacion)
  trabajos: TrabajosInvestigacion[]

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
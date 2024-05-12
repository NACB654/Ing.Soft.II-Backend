import { AllowNull, AutoIncrement, Column, CreatedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { Alumno } from 'src/alumnos/alumnos.model';
import { Asesor } from 'src/asesores/asesores.model';
import { Profesor } from 'src/profesores/profesores.model';

@Table
export class Usuario extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  foto_url: string;

  @HasMany(() => Alumno)
  alumnos: Alumno[];

  @HasMany(() => Profesor)
  profesores: Profesor[];

  @HasMany(() => Asesor)
  asesores: Asesor[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
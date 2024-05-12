import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';
import { Keyword } from 'src/keywords/keywords.model';
import { TrabajoKeyword } from 'src/trabajos-keywords/trabajos-keywords.model';
import { Profesor } from 'src/profesores/profesores.model';
import { Area } from 'src/area/area.model';
import { Subarea } from 'src/subarea/subarea.model';
import { Periodo } from 'src/periodos/periodos.model';
import { Asesor } from 'src/asesores/asesores.model';
import { Curso } from 'src/cursos/cursos.model';
import { ODS } from 'src/ods/ods.model';
import { ODSTrabajo } from 'src/ods-trabajos/ods-trabajos.model';
import { Alumno } from 'src/alumnos/alumnos.model';

@Table
export class TrabajosInvestigacion extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  titulo: string;

  @Column
  abstract: string;
  
  @Column
  archivo_url: string;

  @BelongsToMany(() => Keyword, () => TrabajoKeyword)
  keywords: Keyword[];

  @BelongsToMany(() => ODS, () => ODSTrabajo)
  ods: ODS[];

  @ForeignKey(() => Area)
  @Column
  areaId: number;

  @ForeignKey(() => Subarea)
  @Column
  subareaId: number;

  @ForeignKey(() => Periodo)
  @Column
  periodoId: number;

  @ForeignKey(() => Asesor)
  @Column
  asesorId: number;

  @ForeignKey(() => Profesor)
  @Column
  profesorId: number;

  @BelongsTo(() => Profesor)
  profesor: Profesor;

  @ForeignKey(() => Alumno)
  @Column
  alumnoId: number;

  @BelongsTo(() => Alumno)
  alumno: Alumno;

  @ForeignKey(() => Curso)
  cursoId: number;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
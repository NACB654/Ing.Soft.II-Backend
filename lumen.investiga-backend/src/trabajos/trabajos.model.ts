import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';
import { Keyword } from 'src/keywords/keywords.model';
import { TrabajoKeyword } from 'src/trabajos-keywords/trabajos-keywords.model';
import { Profesor } from 'src/profesores/profesores.model';
import { Subarea } from 'src/subarea/subarea.model';
import { Periodo } from 'src/periodos/periodos.model';
import { Asesor } from 'src/asesores/asesores.model';
import { Curso } from 'src/cursos/cursos.model';
import { ODS } from 'src/ods/ods.model';
import { ODSTrabajo } from 'src/ods-trabajos/ods-trabajos.model';
import { Alumno } from 'src/alumnos/alumnos.model';
import { Comentario } from 'src/comentarios/cometarios.model';
import { Valoracion } from 'src/valoraciones/valoracion.model';

@Table
export class TrabajosInvestigacion extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  titulo: string;

  @Column(DataType.TEXT)
  abstract: string;
  
  @Column
  archivo_url: string;

  @BelongsToMany(() => Keyword, () => TrabajoKeyword)
  keywords: Keyword[];

  @BelongsToMany(() => ODS, () => ODSTrabajo)
  ods: ODS[];

  @ForeignKey(() => Subarea)
  @Column
  subareaId: number;

  @BelongsTo(() => Subarea)
  subArea: Subarea;

  @ForeignKey(() => Periodo)
  @Column
  periodoId: number;

  @BelongsTo(() => Periodo)
  periodo: Periodo;

  @ForeignKey(() => Asesor)
  @Column
  asesorId: number;

  @BelongsTo(() => Asesor)
  asesor: Asesor;

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
  @Column
  cursoId: number;

  @BelongsTo(() => Curso)
  curso: Curso;

  @HasMany(() => Comentario)
  comentarios: Comentario[];

  @HasMany(() => Valoracion)
  valoraciones: Valoracion[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
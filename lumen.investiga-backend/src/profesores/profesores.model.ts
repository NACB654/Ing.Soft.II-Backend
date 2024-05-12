import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, CreatedAt, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';
import { CursoProfesor } from 'src/cursos-profesores/cursos-profesores.model';
import { Curso } from 'src/cursos/cursos.model';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';
import { Usuario } from 'src/usuarios/usuarios.model';

@Table
export class Profesor extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  nombre: string;

  @Column
  apellido: string;

  @Unique
  @Column
  codigo: number;

  @ForeignKey(() => Usuario)
  @Column
  usuarioId: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @BelongsToMany(() => Curso, () => CursoProfesor)
  curso: Curso[];

  @HasMany(() => TrabajosInvestigacion)
  trabajos: TrabajosInvestigacion[]

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
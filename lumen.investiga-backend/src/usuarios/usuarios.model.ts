import { AllowNull, AutoIncrement, BelongsToMany, Column, CreatedAt, HasMany, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';
import { Comentario } from 'src/comentarios/cometarios.model';
import { TrabajoUsuario } from 'src/trabajos-usuarios/trabajos-usuarios.model';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';

@Table
export class Usuario extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  name: string;

  @Column
  last_name: string;

  @Column
  email: string;

  @Unique
  @Column
  codigo: number;

  @Column
  password: string;

  @Column
  foto_url: string;

  @Column
  isTeacher: boolean;

  @HasMany(() => Comentario)
  comentarios: Comentario[];

  @BelongsToMany(() => TrabajosInvestigacion, () => TrabajoUsuario)
  trabajos: TrabajosInvestigacion[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
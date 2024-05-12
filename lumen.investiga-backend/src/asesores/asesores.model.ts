import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';
import { Usuario } from 'src/usuarios/usuarios.model';

@Table
export class Asesor extends Model {
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

  @HasMany(() => TrabajosInvestigacion)
  trabajos: TrabajosInvestigacion[]

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
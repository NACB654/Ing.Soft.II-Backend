import { AllowNull, AutoIncrement, BelongsToMany, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { TrabajoKeyword } from 'src/trabajos-keywords/trabajos-keywords.model';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';


@Table
export class Keyword extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  descripcion: string;

  @BelongsToMany(() => TrabajosInvestigacion, () => TrabajoKeyword)
  trabajos: TrabajosInvestigacion[]

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
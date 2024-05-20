import { AllowNull, AutoIncrement, Column, CreatedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { Subarea } from 'src/subarea/subarea.model';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';

@Table
export class Area extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  descripcion: string;

  @HasMany(() => Subarea)
  subareas: Subarea[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
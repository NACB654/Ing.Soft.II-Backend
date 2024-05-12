import { AllowNull, AutoIncrement, Column, CreatedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
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

  @HasMany(() => TrabajosInvestigacion)
  trabajos: TrabajosInvestigacion[]

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
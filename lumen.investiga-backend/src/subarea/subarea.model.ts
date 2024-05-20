import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { Area } from 'src/area/area.model';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';

@Table
export class Subarea extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  descripcion: string;

  @ForeignKey(() => Area)
  @Column
  areaId: number;

  @BelongsTo(() => Area)
  area: Area;

  @HasMany(() => TrabajosInvestigacion)
  trabajos: TrabajosInvestigacion[]

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
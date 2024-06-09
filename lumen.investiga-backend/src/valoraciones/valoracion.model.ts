import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { TrabajosInvestigacion } from "src/trabajos/trabajos.model";

@Table
export class Valoracion extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  puntaje: number;

  @ForeignKey(() => TrabajosInvestigacion)
  @Column
  trabajoId: number;
  
  @BelongsTo(() => TrabajosInvestigacion)
  trabajo: TrabajosInvestigacion

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
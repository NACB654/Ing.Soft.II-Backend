import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { TrabajosInvestigacion } from "src/trabajos/trabajos.model";

@Table
export class Comentario extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  descripcion: string;

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
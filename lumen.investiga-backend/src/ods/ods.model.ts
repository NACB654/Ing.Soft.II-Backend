import { AllowNull, AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ODSTrabajo } from "src/ods-trabajos/ods-trabajos.model";
import { TrabajosInvestigacion } from "src/trabajos/trabajos.model";

@Table
export class ODS extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  descripcion: string;

  @BelongsToMany(() => TrabajosInvestigacion, () => ODSTrabajo)
  trabajos: TrabajosInvestigacion[]
}
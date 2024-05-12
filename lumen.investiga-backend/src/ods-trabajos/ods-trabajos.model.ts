import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { ODS } from "src/ods/ods.model";
import { TrabajosInvestigacion } from "src/trabajos/trabajos.model";

@Table
export class ODSTrabajo extends Model {
  @ForeignKey(() => ODS)
  @Column
  odsId: number;

  @ForeignKey(() => TrabajosInvestigacion)
  @Column
  trabajoId: number;
}
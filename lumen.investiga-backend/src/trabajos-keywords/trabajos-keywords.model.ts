import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Keyword } from "src/keywords/keywords.model";
import { TrabajosInvestigacion } from "src/trabajos/trabajos.model";

@Table
export class TrabajoKeyword extends Model {
  @ForeignKey(() => TrabajosInvestigacion)
  @Column
  trabajoId: number;

  @ForeignKey(() => Keyword)
  @Column
  keywordId: number;
}
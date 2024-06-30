import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { TrabajosInvestigacion } from "src/trabajos/trabajos.model";
import { Usuario } from "src/usuarios/usuarios.model";

@Table
export class TrabajoUsuario extends Model {
  @ForeignKey(() => TrabajosInvestigacion)
  @Column
  trabajoId: number;

  @ForeignKey(() => Usuario)
  @Column
  usuarioId: number;
}
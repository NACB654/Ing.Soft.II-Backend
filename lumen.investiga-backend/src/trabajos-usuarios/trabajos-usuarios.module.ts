import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TrabajoUsuario } from "./trabajos-usuarios.model";

@Module({
  imports: [SequelizeModule.forFeature([TrabajoUsuario])]
})
export class TrabajoUsuarioModule {}
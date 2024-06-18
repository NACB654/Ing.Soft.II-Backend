import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Valoracion } from "./valoracion.model";
import { ValoracionController } from "./valoracion.controller";
import { ValoracionService } from "./valoracion.service";
import { TrabajosInvestigacion } from "src/trabajos/trabajos.model";

@Module({
  imports: [SequelizeModule.forFeature([Valoracion, TrabajosInvestigacion])],
  controllers: [ValoracionController],
  providers: [ValoracionService]
})
export class ValoracionModule {}
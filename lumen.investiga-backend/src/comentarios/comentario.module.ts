import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Comentario } from "./cometarios.model";
import { ComentarioController } from "./comentarios.controller";
import { ComentarioService } from "./comentarios.service";

@Module({
  imports: [SequelizeModule.forFeature([Comentario])],
  controllers: [ComentarioController],
  providers: [ComentarioService]
})
export class ComentarioModule {}
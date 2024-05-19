import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.model';
import { Profesor } from 'src/profesores/profesores.model';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';

@Module({
    imports: [SequelizeModule.forFeature([Usuario, Profesor, TrabajosInvestigacion])],
    controllers: [UsuariosController],
    providers: [UsuariosService],
})
export class UsuariosModule {}

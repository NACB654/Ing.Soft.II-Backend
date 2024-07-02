import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.model';
import { Profesor } from 'src/profesores/profesores.model';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';
import { TrabajoUsuario } from 'src/trabajos-usuarios/trabajos-usuarios.model';

@Module({
    imports: [SequelizeModule.forFeature([Usuario, Profesor, TrabajosInvestigacion, TrabajoUsuario])],
    controllers: [UsuariosController],
    providers: [UsuariosService],
})
export class UsuariosModule {}

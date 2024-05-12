import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.model';

@Module({
    imports: [SequelizeModule.forFeature([Usuario])],
    controllers: [UsuariosController],
    providers: [UsuariosService],
})
export class UsuariosModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.model';
import { Profesor } from 'src/profesores/profesores.model';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';
import { TrabajoUsuario } from 'src/trabajos-usuarios/trabajos-usuarios.model';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Usuario,
      Profesor,
      TrabajosInvestigacion,
      TrabajoUsuario,
    ]),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, GoogleDriveService, ConfigService],
})
export class UsuariosModule {}

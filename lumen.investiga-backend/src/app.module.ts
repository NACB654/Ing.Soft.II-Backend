import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProfesoresModule } from './profesores/profesores.module';

@Module({
  imports: [UsuariosModule, ProfesoresModule],
})
export class AppModule {}

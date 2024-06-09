import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { AlumnosModule } from './alumnos/alumnos.module';
import { DatabaseModule } from './database/database.module';
import { AsesoresModule } from './asesores/asesores.module';
import { AreaModule } from './area/area.module';
import { CursosModule } from './cursos/cursos.module';
import { CursosProfesoresModule } from './cursos-profesores/cursos-profesores.module';
import { KeywordsModule } from './keywords/keywords.module';
import { OdsModule } from './ods/ods.module';
import { OdsTrabajosModule } from './ods-trabajos/ods-trabajos.module';
import { PeriodosModule } from './periodos/periodos.module';
import { SubareaModule } from './subarea/subarea.module';
import { TrabajosKeywordsModule } from './trabajos-keywords/trabajos-keywords.module';
import { ComentarioModule } from './comentarios/comentario.module';
import { ValoracionModule } from './valoraciones/valoracion.module';

@Module({
  imports: [
    UsuariosModule,
    ProfesoresModule,
    AlumnosModule,
    DatabaseModule,
    AsesoresModule,
    AreaModule,
    CursosModule,
    CursosProfesoresModule,
    KeywordsModule,
    OdsModule,
    OdsTrabajosModule,
    PeriodosModule,
    SubareaModule,
    TrabajosKeywordsModule,
    ComentarioModule,
    ValoracionModule
  ],
})
export class AppModule {}

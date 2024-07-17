import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configurations';
import { GoogleDriveService } from './google-drive/google-drive.service';
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
import { TrabajoUsuarioModule } from './trabajos-usuarios/trabajos-usuarios.module';
import { MulterModule } from '@nestjs/platform-express';
import { LogMiddleware } from './log.middleware';

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
    ValoracionModule,
    TrabajoUsuarioModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MulterModule.register({
      dest: './uploads'
    }),
  ],
  providers: [GoogleDriveService, ConfigService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      .forRoutes('*');
  }
}

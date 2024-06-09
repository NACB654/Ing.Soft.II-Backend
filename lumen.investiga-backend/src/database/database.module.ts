import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AlumnosModule } from 'src/alumnos/alumnos.module';
import { AreaModule } from 'src/area/area.module';
import { AsesoresModule } from 'src/asesores/asesores.module';
import { ComentarioModule } from 'src/comentarios/comentario.module';
import { CursosProfesoresModule } from 'src/cursos-profesores/cursos-profesores.module';
import { CursosModule } from 'src/cursos/cursos.module';
import { KeywordsModule } from 'src/keywords/keywords.module';
import { OdsTrabajosModule } from 'src/ods-trabajos/ods-trabajos.module';
import { OdsModule } from 'src/ods/ods.module';
import { PeriodosModule } from 'src/periodos/periodos.module';
import { ProfesoresModule } from 'src/profesores/profesores.module';
import { SubareaModule } from 'src/subarea/subarea.module';
import { TrabajoKeyword } from 'src/trabajos-keywords/trabajos-keywords.model';
import { TrabajosInvestigacionModule } from 'src/trabajos/trabajos.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { ValoracionModule } from 'src/valoraciones/valoracion.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'lumen.postgres.database.azure.com',
      port: 5432,
      username: 'postgres',
      password: 'p@ssword123',
      database: 'lumen_db',
      autoLoadModels: true,
      synchronize: true,
      logging: console.log,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }),
    UsuariosModule,
    AlumnosModule,
    ProfesoresModule,
    AreaModule,
    SubareaModule,
    TrabajosInvestigacionModule,
    TrabajoKeyword,
    AsesoresModule,
    CursosModule,
    CursosProfesoresModule,
    KeywordsModule,
    OdsModule,
    OdsTrabajosModule,
    PeriodosModule,
    ComentarioModule,
    ValoracionModule
  ],
})
export class DatabaseModule {}
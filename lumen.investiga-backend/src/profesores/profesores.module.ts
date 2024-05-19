import { Module } from '@nestjs/common';
import { ProfesoresController } from './profesores.controller';
import { ProfesoresService } from './profesores.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profesor } from './profesores.model';
import { TrabajosInvestigacion } from 'src/trabajos/trabajos.model';

@Module({
    imports: [SequelizeModule.forFeature([Profesor, TrabajosInvestigacion])],
    controllers: [ProfesoresController],
    providers: [ProfesoresService],
})
export class ProfesoresModule {}

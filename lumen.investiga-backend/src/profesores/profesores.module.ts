import { Module } from '@nestjs/common';
import { ProfesoresController } from './profesores.controller';
import { ProfesoresService } from './profesores.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profesor } from './profesores.model';

@Module({
    imports: [SequelizeModule.forFeature([Profesor])],
    controllers: [ProfesoresController],
    providers: [ProfesoresService],
})
export class ProfesoresModule {}

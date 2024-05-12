import { Module } from '@nestjs/common';
import { TrabajosInvestigacionController } from './trabajos.controller';
import { TrabajosInvestigacionService } from './trabajos.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrabajosInvestigacion } from './trabajos.model';

@Module({
  imports: [SequelizeModule.forFeature([TrabajosInvestigacion])],
  controllers: [TrabajosInvestigacionController],
  providers: [TrabajosInvestigacionService],
})
export class TrabajosInvestigacionModule {}
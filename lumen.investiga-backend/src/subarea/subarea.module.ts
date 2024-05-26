import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subarea } from './subarea.model';
import { SubareaController } from './subarea.controller';
import { SubareaService } from './subarea.service';

@Module({
  imports: [SequelizeModule.forFeature([Subarea])],
  controllers: [SubareaController],
  providers: [SubareaService]
})
export class SubareaModule {}

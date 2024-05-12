import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TrabajoKeyword } from './trabajos-keywords.model';

@Module({
  imports: [SequelizeModule.forFeature([TrabajoKeyword])]
})
export class TrabajosKeywordsModule {}

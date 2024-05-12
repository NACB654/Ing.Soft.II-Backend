import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Keyword } from './keywords.model';

@Module({
  imports: [SequelizeModule.forFeature([Keyword])]
})
export class KeywordsModule {}

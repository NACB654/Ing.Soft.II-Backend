import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ODSTrabajo } from './ods-trabajos.model';

@Module({
  imports: [SequelizeModule.forFeature([ODSTrabajo])]
})
export class OdsTrabajosModule {}

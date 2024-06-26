import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from "cors"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(3001);
}
bootstrap();

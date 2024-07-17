import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from "cors"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(3001);
}
bootstrap();

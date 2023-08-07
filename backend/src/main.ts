import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import dotenv = require('dotenv');

dotenv.config();

import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

const PORT = process.env.PORT === undefined ? 5000 : process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/public' });
  app.useStaticAssets(join(__dirname, '..', 'assets'), { prefix: '/public' });

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Parking finder API')
    .setDescription('Endpoints')
    .setVersion('1.0')
    .addTag('API')
    .build();

  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();

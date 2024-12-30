import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.enableCors();
  app.use(cors({ origin: 'http://localhost:5173' }));

  const config = new DocumentBuilder()
    .setTitle('Need Feed')
    .setDescription('Simple CRUD Operations for Grocery Management')
    .setVersion('0.1')
    .build()
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

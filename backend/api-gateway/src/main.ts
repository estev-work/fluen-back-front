import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Fluen Microservices')
    .setDescription('The kafka Microservices API description')
    .setVersion('1.0')
    .setBasePath('/api')
    //.addTag('default, post')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();

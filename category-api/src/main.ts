import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaNotFoundExceptionFilter } from './exception-filters/PrismaNotFoundExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422
  }))

  app.useGlobalFilters(new PrismaNotFoundExceptionFilter() )

  const config = new DocumentBuilder()
    .setTitle('API Mercado')
    .setDescription('The API Categories 06/07')
    .setVersion('1.0')
    .addTag('categories')
    .addTag('products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();

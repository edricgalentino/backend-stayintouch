import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Stay In Touch Base API')
    .setDescription('Documentation for Stay In Touch Base API')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setVersion('0.0.1')
    .addTag('auth')
    .addTag('user')
    .addTag('confession')
    .addTag('room-confession')
    .addTag('notification')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
      },
      'access-token',
    )
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();

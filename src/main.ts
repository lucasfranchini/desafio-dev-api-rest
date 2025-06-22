import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);


  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  app.use(
    helmet({
      hsts: { maxAge: 31536000 },
    }),
  );

  app.enableCors();

  app.enableShutdownHooks();

  const port = configService.get('APP_PORT');

  await app.listen(port);
}
bootstrap();

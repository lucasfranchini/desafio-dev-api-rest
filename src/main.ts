import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(ConfigService);
  const port = env.get('APP_PORT');

  const config = new DocumentBuilder()
    .setTitle(env.get('SERVICE_NAME'))
    .setDescription(`Documentação do ${env.get('SERVICE_NAME')}`)
    .setVersion(process.env.npm_package_version)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  );
  app.setGlobalPrefix('/api');
  app.enableCors();

  app.enableShutdownHooks();

  SwaggerModule.setup('/doc', app, documentFactory);

  await app.listen(port);
}
bootstrap();

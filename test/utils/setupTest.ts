import { Database } from '@infra/db/schemas';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { setupDatabase } from './setupDb';

export const setupTestSuite = async () => {
  const dataSourceSetup = await setupDatabase();
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(Database)
    .useValue(dataSourceSetup)
    .compile();

  const appSetup = moduleFixture.createNestApplication();
  appSetup.enableVersioning({
    type: VersioningType.URI,
  });
  appSetup.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
    }),
  );
  appSetup.setGlobalPrefix('/api');

  await appSetup.init();

  return { appSetup, dataSourceSetup };
};

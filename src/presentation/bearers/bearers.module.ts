import { BearersServiceModule } from '@application/bearers/bearers-service.module';
import { Module } from '@nestjs/common';
import { BearersV1Controller } from './controllers/v1/bearers.controller';

@Module({
  imports: [BearersServiceModule],
  controllers: [BearersV1Controller],
})
export class BearersModule {}

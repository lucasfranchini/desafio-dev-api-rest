import { RepositoryModule } from '@infra/db/repositories/repository.module';
import { GatewaysModule } from '@infra/gateways/gateways.module';
import { Module } from '@nestjs/common';
import { CreateBearerService } from './v1/create-bearer.service';

const providers = [CreateBearerService];

@Module({
  imports: [RepositoryModule, GatewaysModule],
  providers,
  exports: providers,
})
export class BearersServiceModule {}

import { RepositoryModule } from '@infra/db/repositories/repository.module';
import { Module } from '@nestjs/common';
import { CreateBearerService } from './v1/create-bearer.service';

const providers = [CreateBearerService];

@Module({
  imports: [RepositoryModule],
  providers,
  exports: providers,
})
export class BearersServiceModule {}

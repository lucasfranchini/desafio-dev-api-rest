import { RepositoryModule } from '@infra/db/repositories/repository.module';
import { Module } from '@nestjs/common';
import { CreateBearerService } from './v1/create-bearer.service';
import { DeleteBearerService } from './v1/delete-bearer.service';

const providers = [CreateBearerService, DeleteBearerService];

@Module({
  imports: [RepositoryModule],
  providers,
  exports: providers,
})
export class BearersServiceModule {}

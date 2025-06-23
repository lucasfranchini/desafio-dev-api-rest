import { RepositoryModule } from '@infra/db/repositories/repository.module';
import { Module } from '@nestjs/common';

const providers = [];

@Module({
  imports: [RepositoryModule],
  providers,
  exports: providers,
})
export class AccountServiceModule {}

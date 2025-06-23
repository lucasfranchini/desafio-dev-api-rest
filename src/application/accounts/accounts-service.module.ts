import { RepositoryModule } from '@infra/db/repositories/repository.module';
import { Module } from '@nestjs/common';
import { FindAccountByNumberService } from './v1/find-account-by-number.usecase';

const providers = [FindAccountByNumberService];

@Module({
  imports: [RepositoryModule],
  providers,
  exports: providers,
})
export class AccountServiceModule {}

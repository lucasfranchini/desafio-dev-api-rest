import { RepositoryModule } from '@infra/db/repositories/repository.module';
import { Module } from '@nestjs/common';
import { FindAccountByNumberService } from './v1/find-account-by-number.usecase';
import { UpdateAccountStatusService } from './v1/update-account-status';

const providers = [FindAccountByNumberService, UpdateAccountStatusService];

@Module({
  imports: [RepositoryModule],
  providers,
  exports: providers,
})
export class AccountServiceModule {}

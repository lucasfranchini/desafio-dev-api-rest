import { RepositoryModule } from '@infra/db/repositories/repository.module';
import { Module } from '@nestjs/common';
import { CreateAccountService } from './v1/create-account.service';

const providers = [CreateAccountService];

@Module({
  imports: [RepositoryModule],
  providers,
  exports: providers,
})
export class AccountServiceModule {}

import { RepositoryModule } from '@infra/db/repositories/repository.module';
import { RMQEventPublisherModule } from '@infra/queues/queue.module';
import { Module } from '@nestjs/common';
import { AccountBalanceMovementService } from './v1/account-balance-movement.usecase';
import { FindAccountByNumberService } from './v1/find-account-by-number.usecase';
import { UpdateAccountStatusService } from './v1/update-account-status';

const providers = [
  FindAccountByNumberService,
  UpdateAccountStatusService,
  AccountBalanceMovementService,
];

@Module({
  imports: [RepositoryModule, RMQEventPublisherModule],
  providers,
  exports: providers,
})
export class AccountServiceModule {}

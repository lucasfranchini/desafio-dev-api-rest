import { RepositoryModule } from '@infra/db/repositories/repository.module';
import { GatewaysModule } from '@infra/gateways/gateways.module';
import { RMQEventPublisherModule } from '@infra/queues/queue.module';
import { Module } from '@nestjs/common';
import { AccountBalanceMovementService } from './v1/account-balance-movement.service';
import { FindAccountByNumberService } from './v1/find-account-by-number.service';
import { UpdateAccountStatusService } from './v1/update-account-status.service';

const providers = [
  FindAccountByNumberService,
  UpdateAccountStatusService,
  AccountBalanceMovementService,
];

@Module({
  imports: [RepositoryModule, RMQEventPublisherModule, GatewaysModule],
  providers,
  exports: providers,
})
export class AccountServiceModule {}

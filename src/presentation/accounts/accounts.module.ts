import { AccountServiceModule } from '@application/accounts/accounts-service.module';
import { Module } from '@nestjs/common';
import { AccountsV1Controller } from './controllers/v1/accounts.controller';

@Module({
  imports: [AccountServiceModule],
  controllers: [AccountsV1Controller],
})
export class AccountsModule {}

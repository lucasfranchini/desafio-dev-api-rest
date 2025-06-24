import { RepositoryModule } from '@infra/db/repositories/repository.module';
import { Module } from '@nestjs/common';
import { GetBankStatementService } from './v1/get-bank-statement.service';
import { SaveMovementService } from './v1/save-movement.service';

const providers = [SaveMovementService, GetBankStatementService];

@Module({
  imports: [RepositoryModule],
  providers,
  exports: providers,
})
export class BankStatementServiceModule {}

import { RepositoryModule } from '@infra/db/repositories/repository.module';
import { Module } from '@nestjs/common';
import { SaveMovementService } from './v1/save-movement.service';

const providers = [SaveMovementService];

@Module({
  imports: [RepositoryModule],
  providers,
  exports: providers,
})
export class BankStatementServiceModule {}

import { BankStatementServiceModule } from '@application/bank-statement/bank-statement.module';
import { Module } from '@nestjs/common';
import { BankStatementConsumer } from './bank-statement.consumer';

@Module({
  imports: [BankStatementServiceModule],
  providers: [BankStatementConsumer],
  exports: [BankStatementConsumer],
})
export class BankStatementModule {}

import { Module } from '@nestjs/common';
import { BankStatementConsumer } from './bank-statement.consumer';

@Module({
  imports: [],
  providers: [BankStatementConsumer],
  exports: [BankStatementConsumer],
})
export class BankStatementModule {}

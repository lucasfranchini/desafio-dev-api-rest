import { BankStatementServiceModule } from '@application/bank-statement/bank-statement.module';
import { Module } from '@nestjs/common';
import { BankStatementConsumer } from './consumers/bank-statement.consumer';
import { BankStatementController } from './controllers/v1/bank-statement.controller';

@Module({
  imports: [BankStatementServiceModule],
  providers: [BankStatementConsumer],
  exports: [BankStatementConsumer],
  controllers: [BankStatementController],
})
export class BankStatementModule {}

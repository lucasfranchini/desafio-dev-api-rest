import { RabbitMQModule } from '@bgaldino/nestjs-rabbitmq';
import { RabbitMQConfig } from '@infra/queues/rabbitMQ.config';
import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { BankStatementConsumer } from './bank-statemente/bank-statemente.consumer';
import { BearersModule } from './bearers/bearers.module';

@Module({
  imports: [
    AccountsModule,
    BearersModule,
    RabbitMQModule.register({
      useClass: RabbitMQConfig,
      injects: [BankStatementConsumer],
    }),
  ],
})
export class PresentationModule {}

import { RabbitMQModule } from '@bgaldino/nestjs-rabbitmq';
import { RabbitMQConfig } from '@infra/queues/rabbitMQ.config';
import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { BankStatementModule } from './bank-statement/bank-statement.module';
import { BearersModule } from './bearers/bearers.module';

@Module({
  imports: [
    AccountsModule,
    BearersModule,
    RabbitMQModule.register({
      useClass: RabbitMQConfig,
      injects: [BankStatementModule],
    }),
  ],
})
export class PresentationModule {}

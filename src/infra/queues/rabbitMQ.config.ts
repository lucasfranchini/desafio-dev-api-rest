import {
  RabbitMQModuleOptions,
  RabbitOptionsFactory,
} from '@bgaldino/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { BankStatementConsumer } from '@presentation/bank-statement/consumers/bank-statement.consumer';

@Injectable()
export class RabbitMQConfig implements RabbitOptionsFactory {
  constructor(private readonly bankStatementConsumer: BankStatementConsumer) {}

  static bindings() {
    return {
      exchangeBankStatement: String(
        process.env.RABBITMQ_BANK_STATEMENT_EXCHANGE,
      ),
      queueBankStatement: String(process.env.RABBITMQ_BANK_STATEMENT_QUEUE),
      routingKeyBankStatement: String(
        process.env.RABBITMQ_BANK_STATEMENT_ROUTINGKEY,
      ),
      prefetch: 1,
      delay: 1000,
    };
  }

  createRabbitOptions(): RabbitMQModuleOptions {
    const bindings = RabbitMQConfig.bindings();

    return {
      connectionString: process.env.RABBITMQ_URL,
      delayExchangeName: process.env.RABBITMQ_DELAY_EXCHANGE,
      extraOptions: {
        logType: 'publisher',
      },
      assertExchanges: [
        {
          name: bindings.exchangeBankStatement,
          type: 'topic',
        },
      ],
      consumerChannels: [
        {
          messageHandler:
            this.bankStatementConsumer.handleBankStatementMessage.bind(
              this.bankStatementConsumer,
            ),
          options: {
            exchangeName: bindings.exchangeBankStatement,
            queue: bindings.queueBankStatement,
            routingKey: bindings.routingKeyBankStatement,
            prefetch: bindings.prefetch,
            durable: true,
            autoAck: true,
            retryStrategy: {
              enabled: true,
              maxAttempts: 5,
              delay: (attempts: number) => attempts * bindings.delay,
            },
          },
        },
      ],
    };
  }
}

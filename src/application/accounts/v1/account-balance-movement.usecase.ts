import { AccountBalanceMovementDTO } from '@domain/accounts/dtos/account-balance-movement.dto';
import { MovementType } from '@domain/accounts/enums/movement-type.enum';
import { AccountRepository } from '@infra/db/repositories/accounts/abstractions/account.repository';
import { EventPublisher } from '@infra/queues/abstractions/event-publisher';
import { Injectable } from '@nestjs/common';
import { AccountBalanceInvalid } from 'src/commons/errors/custom-exceptions/account-balance-invalid';
import { AccountsNotFound } from 'src/commons/errors/custom-exceptions/accounts-not-found';
import { ErrorsSource } from 'src/commons/errors/enums';

@Injectable()
export class AccountBalanceMovementService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly rmqEventPublisher: EventPublisher,
  ) {}
  async execute(data: AccountBalanceMovementDTO) {
    const { type, amount, accountNumber } = data;
    const account =
      await this.accountRepository.findByAccountNumber(accountNumber);

    if (!account) throw new AccountsNotFound(ErrorsSource.BALANCE_MOVEMENT);

    const newBalance =
      type === MovementType.IN
        ? Number(account.balance) + amount
        : Number(account.balance) - amount;

    console.log(
      `Movimentação de conta: ${accountNumber}, Tipo: ${type}, Valor: ${amount}, Novo Saldo: ${newBalance}`,
    );
    if (newBalance < 0)
      throw new AccountBalanceInvalid(ErrorsSource.BALANCE_MOVEMENT);

    const { balance } = await this.accountRepository.updateBalance(
      accountNumber,
      newBalance,
    );

    await this.rmqEventPublisher.publish(
      process.env.RABBITMQ_BANK_STATEMENT_EXCHANGE,
      process.env.RABBITMQ_BANK_STATEMENT_ROUTINGKEY,
      data,
    );

    return {
      updatedBalance: balance,
    };
  }
}

//TODO: implementar limite diario de saque utilizando a requisição de extrato

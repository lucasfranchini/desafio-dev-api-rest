import { AccountBalanceMovementDTO } from '@domain/accounts/dtos/account-balance-movement.dto';
import { AccountStatus } from '@domain/accounts/enums/accountStatus';
import { MovementType } from '@domain/accounts/enums/movement-type.enum';
import { AccountRepository } from '@infra/db/repositories/accounts/abstractions/account.repository';
import { CheckBankStatementGateway } from '@infra/gateways/abstractions/check-bank-statement.gateway';
import { EventPublisher } from '@infra/queues/abstractions/event-publisher';
import { Injectable } from '@nestjs/common';
import { AccountBalanceInvalid } from 'src/commons/errors/custom-exceptions/account-balance-invalid';
import { AccountBalanceMovementForbidden } from 'src/commons/errors/custom-exceptions/account-balance-movement-Forbidden';
import { AccountBalanceMovementForbiddenForValue } from 'src/commons/errors/custom-exceptions/account-balance-movement-Forbidden-for-value';
import { AccountsNotFound } from 'src/commons/errors/custom-exceptions/accounts-not-found';
import { ErrorsSource } from 'src/commons/errors/enums';

@Injectable()
export class AccountBalanceMovementService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly rmqEventPublisher: EventPublisher,
    private readonly checkBankStatementLimit: CheckBankStatementGateway,
  ) {}
  async execute(data: AccountBalanceMovementDTO) {
    const { type, amount, accountNumber } = data;
    const account =
      await this.accountRepository.findByAccountNumber(accountNumber);

    if (!account) throw new AccountsNotFound(ErrorsSource.BALANCE_MOVEMENT);

    const statements = await this.checkBankStatementLimit.checkBankStatement(
      accountNumber,
      new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
      new Date(),
    );

    const totalWithdrawals = statements.reduce(
      (acc, statement) =>
        statement.type === MovementType.OUT
          ? acc + Number(statement.amount)
          : acc,
      0,
    );

    if (totalWithdrawals + amount > 2000 && type === MovementType.OUT)
      throw new AccountBalanceMovementForbiddenForValue(
        ErrorsSource.BALANCE_MOVEMENT,
      );

    if (account.status !== AccountStatus.ACTIVE)
      throw new AccountBalanceMovementForbidden(ErrorsSource.BALANCE_MOVEMENT);

    const newBalance =
      type === MovementType.IN
        ? Number(account.balance) + amount
        : Number(account.balance) - amount;

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

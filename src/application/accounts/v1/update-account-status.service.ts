import { AccountStatus } from '@domain/accounts/enums/accountStatus';
import { AccountRepository } from '@infra/db/repositories/accounts/abstractions/account.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountsNotFound } from 'src/commons/errors/custom-exceptions/accounts-not-found';
import { ErrorsSource } from 'src/commons/errors/enums';

@Injectable()
export class UpdateAccountStatusService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(accountNumber: number, status: string) {
    if (!AccountStatus[status])
      throw new BadRequestException({
        message: 'Status inválido',
        source: ErrorsSource.UPDATE_STATUS_ACCOUNT,
      });

    const account = await this.accountRepository.updateStatus(
      accountNumber,
      AccountStatus[status],
    );

    if (!account) {
      throw new AccountsNotFound(ErrorsSource.UPDATE_STATUS_ACCOUNT);
    }

    return account;
  }
}

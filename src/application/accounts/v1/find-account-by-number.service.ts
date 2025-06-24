import { AccountRepository } from '@infra/db/repositories/accounts/abstractions/account.repository';
import { Injectable } from '@nestjs/common';
import { AccountsNotFound } from 'src/commons/errors/custom-exceptions/accounts-not-found';
import { ErrorsSource } from 'src/commons/errors/enums';

@Injectable()
export class FindAccountByNumberService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(accountNumber: number) {
    const account =
      await this.accountRepository.findByAccountNumber(accountNumber);
    if (!account) {
      throw new AccountsNotFound(ErrorsSource.FIND_ACCOUNT_BY_NUMBER);
    }
    return account;
  }
}

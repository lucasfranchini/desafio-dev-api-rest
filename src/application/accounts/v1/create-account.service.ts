import { CreateAccountDTO } from '@domain/accounts/dtos/create-account.dto';
import { AccountStatus } from '@domain/accounts/enums/accountStatus';
import { AccountRepository } from '@infra/db/repositories/accounts/abstractions/account.repository';
import { Injectable } from '@nestjs/common';
import { AccountNotCreated } from 'src/commons/errors/custom-exceptions';
import { ErrorsSource } from 'src/commons/errors/enums';

@Injectable()
export class CreateAccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(account: CreateAccountDTO) {
    try {
      const newAccount = {
        ...account,
        balance: 0,
        status: AccountStatus.ACTIVE,
        branch: '0001', // Default branch, can be customized
      };
      return await this.accountRepository.create(newAccount);
    } catch (error: any) {
      throw new AccountNotCreated(ErrorsSource.CREATE_ACCOUNT, error, account);
    }
  }
}

import { Database } from '@infra/db/schemas';
import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../abstractions/account.repository';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(private readonly dataSource: Database) {}

  async findByAccountNumber(accountNumber: number) {
    return await this.dataSource
      .selectFrom('account')
      .where('number', '=', accountNumber)
      .selectAll()
      .executeTakeFirst();
  }
}

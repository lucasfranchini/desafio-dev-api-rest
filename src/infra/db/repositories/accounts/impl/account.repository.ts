import { Database } from '@infra/db/schemas';
import { NewAccount } from '@infra/db/schemas/account.schema';
import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../abstractions/account.repository';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(private readonly dataSource: Database) {}

  async create(accountData: NewAccount) {
    const res = await this.dataSource
      .insertInto('account')
      .values(accountData)
      .returning('number')
      .executeTakeFirst();

    return res;
  }
}

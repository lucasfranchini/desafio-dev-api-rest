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

  async updateStatus(accountNumber: number, status: string) {
    return await this.dataSource
      .updateTable('account')
      .set({ status })
      .where('number', '=', accountNumber)
      .returningAll()
      .executeTakeFirst();
  }

  async updateBalance(accountNumber: number, balance: number) {
    return await this.dataSource
      .updateTable('account')
      .set({ balance })
      .where('number', '=', accountNumber)
      .returning('balance')
      .executeTakeFirst();
  }
}

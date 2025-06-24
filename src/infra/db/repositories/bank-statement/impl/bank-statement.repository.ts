import { Database } from '@infra/db/schemas';
import { NewBankStatement } from '@infra/db/schemas/bank-statement.schema';
import { Injectable } from '@nestjs/common';
import { BankStatementRepository } from '../abstractions/bank-statement.repository';

@Injectable()
export class BankStatementRepositoryImpl implements BankStatementRepository {
  constructor(private readonly dataSource: Database) {}

  async create(bankStatement: NewBankStatement) {
    return await this.dataSource
      .insertInto('bankStatement')
      .values(bankStatement)
      .returning('id')
      .executeTakeFirstOrThrow();
  }

  async getBankStatementByDate(
    startDate: Date,
    endDate: Date,
    accountNumber: number,
  ) {
    return await this.dataSource
      .selectFrom('bankStatement')
      .where('timestamp', '>=', startDate)
      .where('timestamp', '<=', endDate)
      .where('accountNumber', '=', accountNumber)
      .select(['id', 'accountNumber', 'amount', 'type', 'timestamp'])
      .orderBy('timestamp', 'asc')
      .execute();
  }
}

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
}

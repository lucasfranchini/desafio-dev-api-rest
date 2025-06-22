import { Logger } from '@nestjs/common';
import { CompiledQuery, Kysely, KyselyConfig } from 'kysely';
import { AccountSchema } from './account.schema';
import { BankStatementSchema } from './bank-statement.schema';
import { BearerSchema } from './bearer.schema';

export interface DataBaseSchema {
  account: AccountSchema;
  bearer: BearerSchema;
  bankStatement: BankStatementSchema;
}

export class Database extends Kysely<DataBaseSchema> {
  private logger: Logger;

  constructor(config: KyselyConfig) {
    super(config);
    this.logger = new Logger(Database.name);
  }

  async healthCheck(): Promise<number> {
    try {
      const { rows } = await this.executeQuery<{ result: number }>(
        CompiledQuery.raw('select 1 as result'),
      );
      return rows[0].result === 1 ? 1 : 0;
    } catch (error) {
      this.logger.error('Database health check failed:', error);
      return -1;
    }
  }
}

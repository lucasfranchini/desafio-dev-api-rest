import { Module } from '@nestjs/common';
import { CamelCasePlugin, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from '../schemas';
import { AccountRepository } from './accounts/abstractions/account.repository';
import { AccountRepositoryImpl } from './accounts/impl/account.repository';
import { BankStatementRepository } from './bank-statement/abstractions/bank-statement.repository';
import { BankStatementRepositoryImpl } from './bank-statement/impl/bank-statement.repository';
import { BearerRepository } from './bearers/abstractions/bearers.repository';
import { BearersRepositoryImpl } from './bearers/impl/bearers.repository';

const providers = [
  {
    provide: Database,
    useFactory: () => {
      const dialect = new PostgresDialect({
        pool: new Pool({
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT ?? 5432),
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        }),
      });

      return new Database({
        dialect,
        plugins: [new CamelCasePlugin()],
      });
    },
  },
  {
    provide: AccountRepository,
    useClass: AccountRepositoryImpl,
  },
  {
    provide: BearerRepository,
    useClass: BearersRepositoryImpl,
  },
  {
    provide: BankStatementRepository,
    useClass: BankStatementRepositoryImpl,
  },
];

@Module({
  imports: [],
  providers,
  exports: providers,
})
export class RepositoryModule {}

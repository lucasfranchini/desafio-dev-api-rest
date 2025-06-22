import { Module } from '@nestjs/common';
import { CamelCasePlugin, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database } from '../schemas';

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
];

@Module({
  imports: [],
  providers,
  exports: providers,
})
export class RepositoryModule {}

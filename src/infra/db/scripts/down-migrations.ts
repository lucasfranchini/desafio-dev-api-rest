import 'dotenv/config';
import { promises as fs } from 'fs';
import {
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from 'kysely';
import * as path from 'path';
import { Pool } from 'pg';

async function downMigrations() {
  const database = new Kysely({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT ?? 5432),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),
    }),
  });

  const migrator = new Migrator({
    db: database,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, '..', 'migrations'),
    }),
  });

  const { error, results } = await migrator.migrateDown();

  results?.forEach((migrationResult) => {
    if (migrationResult.status === 'Success') {
      console.log(
        `migration "${migrationResult.migrationName}" was undone successfully`,
      );
    } else if (migrationResult.status === 'Error') {
      console.error(
        `failed to execute migration "${migrationResult.migrationName}"`,
      );
    }
  });

  if (error) {
    console.error('Failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await database.destroy();
}

downMigrations();

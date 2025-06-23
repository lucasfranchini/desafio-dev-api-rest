import { up as firstMigration } from '@infra/db/migrations/1750611951069-initial-database-setup';
import { Database } from '@infra/db/schemas';
import { CamelCasePlugin } from 'kysely';
import { randomUUID } from 'node:crypto';
import { DataType, newDb } from 'pg-mem';

export const setupDatabase = async () => {
  const db = newDb();

  db.registerExtension('uuid-ossp', (schema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: randomUUID,
      impure: true,
    });
  });

  db.public.registerFunction({
    name: 'gen_random_uuid',
    returns: DataType.uuid,
    implementation: randomUUID,
    impure: true,
  });

  db.public.registerFunction({
    name: 'current_database',
    implementation: () => 'test',
  });

  db.public.registerFunction({
    name: 'version',
    implementation: () => 'Postgres 13',
  });

  const kysely = db.adapters.createKysely();
  const dataSource = kysely.withPlugin(new CamelCasePlugin()) as Database;

  await firstMigration(dataSource);

  return dataSource;
};

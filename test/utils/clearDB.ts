import { Database } from '@infra/db/schemas';

export async function clearDb(dataSource: Database) {
  await dataSource.deleteFrom('account').execute();
}

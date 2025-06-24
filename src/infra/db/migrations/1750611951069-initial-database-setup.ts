import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('bearer')
    .addColumn('document', 'varchar(14)', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable('account')
    .addColumn('number', 'bigserial', (col) => col.primaryKey())
    .addColumn('bearer_document', 'varchar(14)', (col) =>
      col.notNull().references('bearer.document').onDelete('cascade'),
    )
    .addColumn('balance', 'numeric(50, 2)', (col) => col.notNull())
    .addColumn('branch', 'varchar(5)', (col) => col.notNull())
    .addColumn('status', 'varchar(15)', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createTable('bank_statement')
    .addColumn('id', 'bigserial', (col) => col.primaryKey())
    .addColumn('account_number', 'bigint', (col) =>
      col.notNull().references('account.number').onDelete('cascade'),
    )
    .addColumn('type', 'varchar(8)', (col) => col.notNull())
    .addColumn('amount', 'numeric(50, 2)', (col) => col.notNull())
    .addColumn('timestamp', 'timestamp', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
    .execute();

  await db.schema
    .createIndex('account_bearer_document_index')
    .on('account')
    .column('bearer_document')
    .execute();

  await db.schema
    .createIndex('bank_statement_account_index')
    .on('bank_statement')
    .column('account_number')
    .execute();

  await db.schema
    .createIndex('bank_statement_created_at_index')
    .on('bank_statement')
    .column('created_at')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropIndex('bank_statement_account_index').execute();
  await db.schema.dropIndex('account_bearer_document_index').execute();
  await db.schema.dropIndex('bank_statement_created_at_index').execute();
  await db.schema.dropTable('account').cascade().execute();
  await db.schema.dropTable('bank_statement').cascade().execute();
  await db.schema.dropTable('bearer').cascade().execute();
}

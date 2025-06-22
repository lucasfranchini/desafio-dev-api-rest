import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';
import { BankStatementSchema } from './bank-statement.schema';
import { BearerSchema } from './bearer.schema';

export interface AccountSchema {
  id: Generated<number>;
  balance: number;
  status: string;
  branch: string;
  bearerDocument: string;
  accountNumber: Generated<number>;
  createdAt: ColumnType<Date, undefined, never>;
  updatedAt: ColumnType<Date, undefined, never>;
  bearer?: BearerSchema;
  bankStatements?: BankStatementSchema[];
}

export type Account = Selectable<AccountSchema>;
export type NewAccount = Insertable<AccountSchema>;
export type AccountUpdate = Updateable<AccountSchema>;

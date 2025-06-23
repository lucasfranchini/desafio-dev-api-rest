import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface AccountSchema {
  number: Generated<number>;
  balance: number;
  status: string;
  branch: string;
  bearerDocument: string;
  createdAt: ColumnType<Date, undefined, never>;
  updatedAt: ColumnType<Date, undefined, never>;
}

export type Account = Selectable<AccountSchema>;
export type NewAccount = Insertable<AccountSchema>;
export type AccountUpdate = Updateable<AccountSchema>;

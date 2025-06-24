import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface BankStatementSchema {
  id: Generated<number>;
  type: string;
  amount: number;
  accountNumber: number;
  timestamp: Date;
  createdAt: ColumnType<Date, undefined, never>;
  updatedAt: ColumnType<Date, undefined, never>;
}

export type BankStatement = Selectable<BankStatementSchema>;
export type NewBankStatement = Insertable<BankStatementSchema>;
export type BankStatementUpdate = Updateable<BankStatementSchema>;

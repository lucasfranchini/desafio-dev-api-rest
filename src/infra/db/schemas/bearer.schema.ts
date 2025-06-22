import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';
import { AccountSchema } from './account.schema';

export interface BearerSchema {
  name: string;
  document: string;
  createdAt: ColumnType<Date, undefined, never>;
  updatedAt: ColumnType<Date, undefined, never>;
  accounts?: AccountSchema;
}

export type Bearer = Selectable<BearerSchema>;
export type NewBearer = Insertable<BearerSchema>;
export type BearerUpdate = Updateable<BearerSchema>;

import { AccountStatus } from '../enums/accountStatus';

export class AccountDTO {
  number: number;
  balance: number;
  status: AccountStatus;
  branch: string;
  bearerDocument: string;
  createdAt: Date;
  updatedAt: Date;
}

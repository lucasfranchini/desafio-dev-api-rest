import { Account } from '@infra/db/schemas/account.schema';

export abstract class AccountRepository {
  abstract findByAccountNumber(accountNumber: number): Promise<Account>;
  abstract updateStatus(
    accountNumber: number,
    status: string,
  ): Promise<Account>;

  abstract updateBalance(
    accountNumber: number,
    balance: number,
  ): Promise<{ balance: number }>;
}

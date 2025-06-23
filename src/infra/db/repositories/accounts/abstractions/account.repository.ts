import { NewAccount } from '@infra/db/schemas/account.schema';

export abstract class AccountRepository {
  abstract create(account: NewAccount): Promise<{ number: number }>;
}

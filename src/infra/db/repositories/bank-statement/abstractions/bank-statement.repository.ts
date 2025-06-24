import { NewBankStatement } from '@infra/db/schemas/bank-statement.schema';

export abstract class BankStatementRepository {
  abstract create(bearer: NewBankStatement): Promise<{ id: number }>;
}

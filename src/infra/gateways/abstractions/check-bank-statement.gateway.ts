import { BankStatementDTO } from '@domain/bank-statements/bank-statement.dto';

export abstract class CheckBankStatementGateway {
  abstract checkBankStatement(
    accountNumber: number,
    startDate: Date,
    endDate: Date,
  ): Promise<BankStatementDTO[]>;
}

export class BankStatementDTO {
  id: number;
  accountNumber: number;
  type: string;
  amount: number;
}

export class BankStatementCreateDTO {
  accountNumber: number;
  type: string;
  amount: number;
}

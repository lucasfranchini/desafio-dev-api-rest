export class BankStatementDTO {
  id: number;
  accountNumber: number;
  type: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class BankStatementCreateDTO {
  accountNumber: number;
  type: string;
  amount: number;
}

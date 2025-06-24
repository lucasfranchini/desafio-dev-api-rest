import { ApiProperty } from '@nestjs/swagger';

export class BankStatementDTO {
  @ApiProperty({ description: 'id da transação' })
  id: number;

  @ApiProperty({ description: 'numero da conta' })
  accountNumber: number;

  @ApiProperty({ description: 'tipo da transação IN ou OUT' })
  type: string;

  @ApiProperty({ description: 'valor da transação' })
  amount: number;
}

export class BankStatementCreateDTO {
  accountNumber: number;
  type: string;
  amount: number;
}

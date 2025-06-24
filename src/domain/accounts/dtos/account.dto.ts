import { ApiProperty } from '@nestjs/swagger';
import { AccountStatus } from '../enums/accountStatus';

export class AccountDTO {
  @ApiProperty({ description: 'numero da conta' })
  number: number;

  @ApiProperty({ description: 'saldo da conta' })
  balance: number;

  @ApiProperty({
    description: 'status da conta, ativa ou inativa ou bloqueada',
  })
  status: AccountStatus;

  @ApiProperty({ description: 'agencia da conta' })
  branch: string;

  @ApiProperty({ description: 'CPF do portador' })
  bearerDocument: string;

  @ApiProperty({ description: 'data de criação da conta' })
  createdAt: Date;

  @ApiProperty({ description: 'data da ultima atualização da conta' })
  updatedAt: Date;
}

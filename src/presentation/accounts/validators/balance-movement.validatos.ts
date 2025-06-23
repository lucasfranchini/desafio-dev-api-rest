import { MovementType } from '@domain/accounts/enums/movement-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';

export class BalanceMovementValidator {
  @IsEnum(MovementType, {
    message: 'Tipo de movimento deve ser IN ou OUT',
  })
  @ApiProperty({
    description: 'tipo de movimento, se é saque ou depósito',
    example: 'IN',
  })
  type: MovementType;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'O valor deve ser um número com até duas casas decimais',
    },
  )
  @ApiProperty({
    description: 'valor a ser transacionado pela conta',
    example: 100,
  })
  amount: number;

  @IsNumber(
    {},
    {
      message: 'O numero da conta deve conter apenas digitos',
    },
  )
  @ApiProperty({
    description: 'numero da conta que recebera o movimento',
    example: 123456,
  })
  accountNumber: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Length } from 'class-validator';

export class CreateAccountValidator {
  @Length(11, 11, {
    message: 'numero do documento deve ter 11 caracteres',
  })
  @IsNumberString(
    { no_symbols: true },
    {
      message: 'o documento deve possuir apenas digitos',
    },
  )
  @ApiProperty({ description: 'CPF da conta' })
  bearerDocument: string;
}

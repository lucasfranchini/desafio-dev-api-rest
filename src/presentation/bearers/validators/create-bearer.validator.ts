import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Length, MaxLength } from 'class-validator';

export class CreateBearerValidator {
  @Length(11, 14, {
    message: 'numero do documento deve ter 11 digitos (sem pontos ou traços)',
  })
  @IsNumberString(
    { no_symbols: true },
    {
      message: 'o documento deve possuir apenas digitos',
    },
  )
  document: string;

  @MaxLength(255, {
    message: 'o nome do portador deve ter no maximo 255 caracteres',
  })
  @ApiProperty({ description: 'nome do portador' })
  name: string;
}

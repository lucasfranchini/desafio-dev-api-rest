import { FindAccountByNumberService } from '@application/accounts/v1/find-account-by-number.usecase';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerDocDecorator } from 'src/commons/decorators/swagger-doc.decorator';
import { ErrorsMessage, ErrorsSource } from 'src/commons/errors/enums';
import { handleError } from 'src/commons/errors/functions';

@ApiTags('accounts')
@Controller({ version: '1', path: 'accounts' })
export class AccountsV1Controller {
  constructor(
    private readonly findAccountByNumberService: FindAccountByNumberService,
  ) {}

  @Get('/:accountNumber')
  @ApiResponse({
    status: 200,
    description: 'Conta Encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Erro ao procurar conta no banco de dados',
    example: {
      message: ErrorsMessage.ACCOUNTS_NOT_FOUND,
      source: ErrorsSource.FIND_ACCOUNT_BY_NUMBER,
    },
  })
  @SwaggerDocDecorator('busca de contas salvas no banco pelo numero da conta')
  async getAccountByNumber(@Param('accountNumber') accountNumber: number) {
    try {
      return await this.findAccountByNumberService.execute(accountNumber);
    } catch (error) {
      handleError(ErrorsSource.FIND_ACCOUNT_BY_NUMBER, error);
    }
  }
}

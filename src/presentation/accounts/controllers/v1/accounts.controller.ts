import { CreateAccountService } from '@application/accounts';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccountValidator } from '@presentation/accounts/validators/create-account.validator';
import { SwaggerDocDecorator } from 'src/commons/decorators/swagger-doc.decorator';
import { ErrorsSource } from 'src/commons/errors/enums';
import { handleError } from 'src/commons/errors/functions';

@ApiTags('accounts')
@Controller({ version: '1', path: 'accounts' })
export class AccountsV1Controller {
  constructor(private readonly createAccountService: CreateAccountService) {}

  @Post()
  @SwaggerDocDecorator('criação de uma conta no banco de dados')
  @ApiResponse({
    status: 201,
    description: 'Criado com sucesso',
    example: { accountNumber: '12345678' },
  })
  @ApiResponse({ status: 400, description: 'Erro ao tentar criar uma conta' })
  async createAcccount(@Body() body: CreateAccountValidator) {
    try {
      return await this.createAccountService.execute(body);
    } catch (error) {
      handleError(ErrorsSource.CREATE_ACCOUNT, error);
    }
  }
}

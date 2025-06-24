import { AccountBalanceMovementService } from '@application/accounts/v1/account-balance-movement.usecase';
import { FindAccountByNumberService } from '@application/accounts/v1/find-account-by-number.usecase';
import { UpdateAccountStatusService } from '@application/accounts/v1/update-account-status';
import { AccountDTO } from '@domain/accounts/dtos/account.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BalanceMovementValidator } from '@presentation/accounts/validators/balance-movement.validatos';
import { SwaggerDocDecorator } from 'src/commons/decorators/swagger-doc.decorator';
import { ErrorsMessage, ErrorsSource } from 'src/commons/errors/enums';
import { handleError } from 'src/commons/errors/functions';

@ApiTags('accounts')
@Controller({ version: '1', path: 'accounts' })
export class AccountsV1Controller {
  constructor(
    private readonly findAccountByNumberService: FindAccountByNumberService,
    private readonly updateAccountStatusService: UpdateAccountStatusService,
    private readonly accountBalanceMovementService: AccountBalanceMovementService,
  ) {}

  @Get('/:accountNumber')
  @ApiResponse({
    status: 200,
    description: 'Conta Encontrada',
    type: AccountDTO,
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

  @Put('/:accountNumber/:status')
  @ApiResponse({
    status: 200,
    description: 'Conta atualizada com sucesso',
    type: AccountDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Erro ao procurar conta no banco de dados',
    example: {
      message: ErrorsMessage.ACCOUNT_NOT_CREATED,
      source: ErrorsSource.UPDATE_STATUS_ACCOUNT,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Status Invalido',
  })
  @SwaggerDocDecorator('atualização de status nas contas salvas no banco')
  async updateStatus(
    @Param('accountNumber') accountNumber: number,
    @Param('status') status: string,
  ) {
    try {
      return await this.updateAccountStatusService.execute(
        accountNumber,
        status,
      );
    } catch (error) {
      handleError(ErrorsSource.UPDATE_STATUS_ACCOUNT, error);
    }
  }

  @Post('/balance/movement')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'movimentação de saldo realizada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para movimentação de saldo',
  })
  @SwaggerDocDecorator('movimentação do saldo da conta')
  async balanceMovement(@Body() body: BalanceMovementValidator) {
    try {
      return await this.accountBalanceMovementService.execute(body);
    } catch (error) {
      handleError(ErrorsSource.UPDATE_STATUS_ACCOUNT, error);
    }
  }
}

//TODO: adicionar tupagem para documentação do swagger

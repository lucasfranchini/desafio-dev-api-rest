import { GetBankStatementService } from '@application/bank-statement/v1/get-bank-statement.service';
import { BankStatementDTO } from '@domain/bank-statements/bank-statement.dto';
import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerDocDecorator } from 'src/commons/decorators/swagger-doc.decorator';
import { ErrorsSource } from 'src/commons/errors/enums';
import { handleError } from 'src/commons/errors/functions';

@ApiTags('bank-statements')
@Controller({ version: '1', path: 'bank-statements' })
export class BankStatementController {
  constructor(
    private readonly getBankStatementService: GetBankStatementService,
  ) {}

  @Get()
  @SwaggerDocDecorator(
    'Busca do extrato bancari de uma conta baseado em um periodo',
  )
  @ApiResponse({
    status: 400,
    description: 'Erro ao tentar buscar extrato bancario, parametros ivalidos',
  })
  @ApiResponse({
    status: 200,
    description: 'Extrato bancario buscado com sucesso',
    type: [BankStatementDTO],
  })
  async getBankStatement(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query(
      'accountNumber',
      new ParseIntPipe({
        exceptionFactory: () =>
          new BadRequestException({
            message: 'AccountNumber precisa ser um numero inteiro',
            source: ErrorsSource.GET_BANK_STATEMENT,
          }),
      }),
    )
    accountNumber: number,
  ) {
    try {
      if (!startDate || !endDate || !accountNumber) {
        throw new BadRequestException({
          message: 'StartDate, EndDate e AccountNumber são obrigatórios',
          source: ErrorsSource.GET_BANK_STATEMENT,
        });
      }

      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new BadRequestException({
          message: 'Datas inválidas',
          source: ErrorsSource.GET_BANK_STATEMENT,
        });
      }

      return await this.getBankStatementService.execute(
        start,
        end,
        accountNumber,
      );
    } catch (error) {
      handleError(ErrorsSource.GET_BANK_STATEMENT, error);
    }
  }
}

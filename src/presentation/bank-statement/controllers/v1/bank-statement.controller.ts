import { GetBankStatementService } from '@application/bank-statement/v1/get-bank-statement.service';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ErrorsSource } from 'src/commons/errors/enums';
import { handleError } from 'src/commons/errors/functions';

@ApiTags('bank-statements')
@Controller({ version: '1', path: 'bank-statements' })
export class BankStatementController {
  constructor(
    private readonly getBankStatementService: GetBankStatementService,
  ) {}

  @Get()
  async getBankStatement(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    try {
      if (!startDate || !endDate) {
        throw new BadRequestException({
          message: 'StartDate e EndDate são obrigatórios',
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
      return await this.getBankStatementService.execute(start, end);
    } catch (error) {
      handleError(ErrorsSource.GET_BANK_STATEMENT, error);
    }
  }
}

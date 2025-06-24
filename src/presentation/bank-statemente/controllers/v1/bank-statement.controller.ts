import { Controller, Get, Query } from '@nestjs/common';
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
      return await this.getBankStatementService.execute(startDate, endDate);
    } catch (error) {
      handleError(ErrorsSource.GET_BANK_STATEMENT, error);
    }
  }
}

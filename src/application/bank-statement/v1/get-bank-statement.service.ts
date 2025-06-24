import { BankStatementRepository } from '@infra/db/repositories/bank-statement/abstractions/bank-statement.repository';
import { Injectable } from '@nestjs/common';
import { BankStatementNotFound } from 'src/commons/errors/custom-exceptions/bank-statement-not-found';
import { ErrorsSource } from 'src/commons/errors/enums';

@Injectable()
export class GetBankStatementService {
  constructor(
    private readonly bankStatementRepository: BankStatementRepository,
  ) {}
  async execute(startDate: Date, endDate: Date): Promise<any> {
    try {
      return await this.bankStatementRepository.getBankStatementByDate(
        startDate,
        endDate,
      );
    } catch (error: any) {
      throw new BankStatementNotFound(ErrorsSource.SAVE_MOVEMENT, error);
    }
  }
}

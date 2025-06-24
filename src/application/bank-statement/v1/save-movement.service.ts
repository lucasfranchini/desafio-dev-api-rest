import { BankStatementCreateDTO } from '@domain/bank-statements/bank-statement.dto';
import { BankStatementRepository } from '@infra/db/repositories/bank-statement/abstractions/bank-statement.repository';
import { Injectable } from '@nestjs/common';
import { BankStatementNotCreated } from 'src/commons/errors/custom-exceptions/bank-statement-not-created';
import { ErrorsSource } from 'src/commons/errors/enums';

@Injectable()
export class SaveMovementService {
  constructor(
    private readonly bankStatementRepository: BankStatementRepository,
  ) {}

  async execute(bankStatementTransaction: BankStatementCreateDTO) {
    try {
      return await this.bankStatementRepository.create({
        ...bankStatementTransaction,
        timestamp: new Date(),
      });
    } catch (error: any) {
      throw new BankStatementNotCreated(
        ErrorsSource.SAVE_MOVEMENT,
        error,
        bankStatementTransaction,
      );
    }
  }
}

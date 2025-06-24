import { InternalServerErrorException } from '@nestjs/common';
import { ErrorsMessage, ErrorsSource } from '../enums';

export class BankStatementNotFound extends InternalServerErrorException {
  constructor(source: ErrorsSource, databaseError?: Error, payload?: any) {
    super({
      message: ErrorsMessage.BANK_STATEMENT_NOT_FOUND,
      source,
      databaseError,
      payload,
    });
  }
}

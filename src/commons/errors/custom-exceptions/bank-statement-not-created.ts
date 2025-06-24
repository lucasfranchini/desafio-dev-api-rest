import { InternalServerErrorException } from '@nestjs/common';
import { ErrorsMessage, ErrorsSource } from '../enums';

export class BankStatementNotCreated extends InternalServerErrorException {
  constructor(source: ErrorsSource, databaseError?: Error, payload?: any) {
    super({
      message: ErrorsMessage.BEARER_NOT_CREATED,
      source,
      databaseError,
      payload,
    });
  }
}
